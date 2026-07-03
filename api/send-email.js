import { Resend } from 'resend';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to hash data as required by Meta (SHA-256)
const hashData = (data) => {
  if (!data) return null;
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      sessionId, isPartial, isAbandoned, lastCompletedStep, // <-- Tracking fields
      firstName, email, phone, businessName, 
      industry, primaryGoals, desiredFeatures, budget,
      wantsCall, callDate, callTime, eventId 
    } = req.body;

    const callPreferenceText = wantsCall === 'yes' 
      ? `Requested call on ${callDate} at ${callTime} (UK Time)` 
      : 'No call requested';

    // -------------------------------------------------------------
    // SCENARIO 1: PARTIAL OR ABANDONED LEADS (RESCUE MISSION)
    // -------------------------------------------------------------
    if (isPartial) {
      if (isAbandoned) {
        console.log(`⚠️ ABANDONED LEAD: Session ${sessionId} dropped off at Step ${lastCompletedStep}`);
        
        // Fire a "Rescue" email to yourself containing whatever they typed so far
        await resend.emails.send({
          from: 'Launch My Website <sales@launchmywebsite.agency>',
          to: ['sales@launchmywebsite.agency'],
          subject: `🚨 Rescue Lead: Abandoned at step ${lastCompletedStep}`,
          html: `
            <h2>Abandoned Project Application</h2>
            <p>A user closed the form before finishing it. Here is the data we managed to capture:</p>
            <hr />
            <p><strong>Name:</strong> ${firstName || 'Not provided'}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Business Name:</strong> ${businessName || 'Not provided'}</p>
            <p><strong>Industry:</strong> ${industry || 'Not provided'}</p>
            <p><strong>Goals:</strong> ${primaryGoals || 'Not provided'}</p>
            <p><strong>Features:</strong> ${desiredFeatures || 'Not provided'}</p>
            <p><strong>Budget:</strong> ${budget || 'Not provided'}</p>
          `,
        });
      } else {
        // User clicked "Continue" - Silently track progress in console
        console.log(`🔄 PROGRESS: Session ${sessionId} completed Step ${lastCompletedStep}`);
      }

      // Return 200 early so the frontend continues without triggering the final submission emails below
      return res.status(200).json({ success: true, message: 'Partial state handled' });
    }

    // -------------------------------------------------------------
    // SCENARIO 2: FULLY COMPLETED SUBMISSION (EMAIL 1 & 2)
    // -------------------------------------------------------------

    // EMAIL 1: Send the raw lead data to YOUR business inbox
    const notifyAdmin = resend.emails.send({
      from: 'Launch My Website <sales@launchmywebsite.agency>', 
      to: ['sales@launchmywebsite.agency'], 
      subject: `New Lead: ${businessName} - ${firstName}`,
      html: `
        <h2>New Project Application</h2>
        <p><strong>Name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Strategy Call:</strong> ${callPreferenceText}</p>
        <hr />
        <p><strong>Business Name:</strong> ${businessName}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Goals:</strong> ${primaryGoals}</p>
        <p><strong>Features:</strong> ${desiredFeatures}</p>
        <p><strong>Budget:</strong> ${budget}</p>
      `,
    });

    // EMAIL 2: Send the branded auto-reply to the CUSTOMER
    const notifyCustomer = resend.emails.send({
      from: 'Launch My Website <sales@launchmywebsite.agency>',
      to: [email], 
      subject: `We've received your application, ${firstName}! 🚀`,
      html: `
        <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #F8FAFC; padding: 20px; border-radius: 12px;">
          
          <!-- Branded Header -->
          <div style="text-align: center; background: linear-gradient(to right, #0314B0, #001B70); padding: 30px 20px; border-radius: 12px 12px 0 0;">
            <img src="https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/header-logo.webp" alt="Launch My Website" style="height: 40px; margin-bottom: 15px;" />
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 900;">Application Received!</h1>
          </div>
          
          <!-- Email Body -->
          <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <p style="font-size: 16px; color: #334155; line-height: 1.6;">Hi <strong>${firstName}</strong>,</p>
            
            <p style="font-size: 16px; color: #334155; line-height: 1.6;">Thank you for applying to build your website with us. We have successfully received your project details for <strong>${businessName}</strong>.</p>
            
            <p style="font-size: 16px; color: #334155; line-height: 1.6;">Our team is currently reviewing your requirements, and one of our web strategists will reach out to you shortly.</p>
            
            <!-- Call to Action Button -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://launchmywebsite.agency" style="background-color: #ffb72b; color: #0f172a; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 50px; display: inline-block;">Explore Our Portfolio</a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
            
            <!-- Footer -->
            <p style="font-size: 14px; color: #64748b; text-align: center; margin: 0;">
              The Launch My Website Team<br>
              <a href="mailto:sales@launchmywebsite.agency" style="color: #0314B0; text-decoration: none;">sales@launchmywebsite.agency</a>
            </p>
          </div>
        </div>
      `,
    });

    const [adminResult, customerResult] = await Promise.all([notifyAdmin, notifyCustomer]);

    if (adminResult.error) throw adminResult.error;
    if (customerResult.error) throw customerResult.error;

    // -------------------------------------------------------------
    // META CONVERSIONS API LOGIC
    // -------------------------------------------------------------
    const PIXEL_ID = '1713657916510847';
    const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN; 

    // Optional Check: Only run if the token is set to prevent crashes in dev environments
    if (ACCESS_TOKEN) {
      await fetch(`https://graph.facebook.com/v20.0/${PIXEL_ID}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [{
            event_name: 'SubmitApplication',
            event_time: Math.floor(Date.now() / 1000),
            event_id: eventId, // Used for deduplication
            action_source: 'website',
            user_data: {
              em: hashData(email),
              ph: hashData(phone),
              client_ip_address: req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
              client_user_agent: req.headers['user-agent']
            }
          }],
          access_token: ACCESS_TOKEN
        })
      });
    } else {
      console.warn("Meta Access Token is missing, skipping Conversions API event.");
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: error.message || 'Failed to process request' });
  }
}