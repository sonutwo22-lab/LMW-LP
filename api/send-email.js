import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  // Parse the body if Vite hasn't already
  let body = req.body;
  if (!body && typeof req.on === 'function') {
      body = await new Promise((resolve, reject) => {
          let data = '';
          req.on('data', chunk => data += chunk);
          req.on('end', () => resolve(JSON.parse(data || '{}')));
          req.on('error', reject);
      });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['sonutwo22@gmail.com'], // USE YOUR REAL EMAIL HERE
      subject: `New Lead: ${body.businessName}`,
      html: `<p>New lead from ${body.firstName} (${body.email})</p>`,
    });

    if (error) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error }));
    }

    res.statusCode = 200;
    return res.end(JSON.stringify({ data }));

  } catch (error) {
    console.error("FATAL CRASH:", error);
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: 'Failed to send email' }));
  }
}