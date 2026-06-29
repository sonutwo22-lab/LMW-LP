import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract the form data cleanly from Vercel's request
    const { 
      firstName, email, phone, businessName, 
      industry, primaryGoals, desiredFeatures, budget 
    } = req.body;

    const { data, error } = await resend.emails.send({
      // 1. THIS MUST MATCH YOUR VERIFIED HOSTINGER DOMAIN (e.g., info@launchmywebsite.agency)
      from: 'Launch My Website <info@your-verified-domain.com>', 
      // 2. Put both your personal and Hostinger business emails here
      to: ['sonutwo22@gmail.com', 'your-business-email@your-verified-domain.com'], 
      subject: `New Lead: ${businessName} - ${firstName}`,
      html: `
        <h2>New Project Application</h2>
        <p><strong>Name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <hr />
        <p><strong>Business Name:</strong> ${businessName}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Goals:</strong> ${primaryGoals}</p>
        <p><strong>Features:</strong> ${desiredFeatures}</p>
        <p><strong>Budget:</strong> ${budget}</p>
      `,
    });

    if (error) {
      console.error("Resend Rejected the Email:", error);
      return res.status(400).json({ error });
    }

    return res.status(200).json({ data });
  } catch (error) {
    console.error("Server Code Crashed:", error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}