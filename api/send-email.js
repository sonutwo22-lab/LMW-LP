import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      firstName, email, phone, businessName, 
      industry, primaryGoals, desiredFeatures, budget 
    } = req.body;

    // -------------------------------------------------------------
    // EMAIL 1: Send the raw lead data to YOUR business inbox
    // -------------------------------------------------------------
    const notifyAdmin = resend.emails.send({
      from: 'Launch My Website <sales@launchmywebsite.agency>', 
      to: ['sales@launchmywebsite.agency'], 
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

    // -------------------------------------------------------------
    // EMAIL 2: Send the branded auto-reply to the CUSTOMER
    // -------------------------------------------------------------
    const notifyCustomer = resend.emails.send({
      from: 'Launch My Website <sales@launchmywebsite.agency>',
      // We use the 'email' variable here so it goes to whatever the customer typed
      to: [email], 
      subject: `We've received your application, ${firstName}! 🚀`,
      html: `
        <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #F8FAFC; padding: 20px; border-radius: 12px;">
          
          <div style="text-align: center; background: linear-gradient(to right, #0314B0, #001B70); padding: 30px 20px; border-radius: 12px 12px 0 0;">
            <img src="https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/header-logo.webp" alt="Launch My Website" style="height: 40px; margin-bottom: 15px;" />
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 900;">Application Received!</h1>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <p style="font-size: 16px; color: #334155; line-height: 1.6;">Hi <strong>${firstName}</strong>,</p>
            
            <p style="font-size: 16px; color: #334155; line-height: 1.6;">Thank you for applying to build your website with us. We have successfully received your project details for <strong>${businessName}</strong>.</p>
            
            <p style="font-size: 16px; color: #334155; line-height: 1.6;">Our team is currently reviewing your requirements, and one of our web strategists will reach out to you shortly to schedule your free strategy call.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://launchmywebsite.agency" style="background-color: #ffb72b; color: #0f172a; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 50px; display: inline-block;">Explore Our Portfolio</a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
            
            <p style="font-size: 14px; color: #64748b; text-align: center; margin: 0;">
              The Launch My Website Team<br>
              <a href="mailto:sales@launchmywebsite.agency" style="color: #0314B0; text-decoration: none;">sales@launchmywebsite.agency</a>
            </p>
          </div>
        </div>
      `,
    });

    // We use Promise.all to send both emails at the exact same time
    const [adminResult, customerResult] = await Promise.all([notifyAdmin, notifyCustomer]);

    // Check if either email failed to send
    if (adminResult.error) throw adminResult.error;
    if (customerResult.error) throw customerResult.error;

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email Sending Error:", error);
    return res.status(500).json({ error: 'Failed to send emails' });
  }
}