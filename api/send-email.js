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
  from: 'Launch My Website <onboarding@resend.dev>', // You can change the name here
  to: ['sonutwo22@gmail.com'], // Add your Hostinger email here too: ['sonutwo22@gmail.com', 'your-business-email@yourdomain.com']
  subject: `New Lead: ${body.businessName}`,
  html: `
    <h2>New Project Application Received</h2>
    <p><strong>Name:</strong> ${body.firstName}</p>
    <p><strong>Email:</strong> ${body.email}</p>
    <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
    <hr />
    <p><strong>Business Name:</strong> ${body.businessName}</p>
    <p><strong>Industry:</strong> ${body.industry}</p>
    <p><strong>Primary Goals:</strong> ${body.primaryGoals}</p>
    <p><strong>Desired Features:</strong> ${body.desiredFeatures}</p>
    <p><strong>Budget:</strong> ${body.budget}</p>
  `,
});