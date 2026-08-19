import nodemailer from "nodemailer";

const host = process.env.EMAIL_HOST;
const port = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 587;
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;

let transporter: nodemailer.Transporter | null = null;

if (host && user && pass) {
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
  console.log("📨 Mailer: SMTP transporter initialized successfully.");
} else {
  console.warn("⚠️ Mailer: Email service configuration missing. Notifications will print to the console instead of sending.");
}

/**
 * Sends a temporary ban notification email
 */
export async function sendBanEmail(to: string, reason?: string): Promise<boolean> {
  const subject = "Your Account Has Been Temporarily Banned";
  const body = `Hello,

Your account has been temporarily banned by an administrator.

As a result, you currently cannot access the application.
${reason ? `\nReason: ${reason}` : ""}

If you believe this action was taken incorrectly, please contact the application administrator.

Regards,
The Support Team`;

  if (!transporter) {
    console.log(`\n--- 📨 [CONSOLE EMAIL LOG] ---\nTo: ${to}\nSubject: ${subject}\nBody:\n${body}\n------------------------------\n`);
    return true;
  }

  try {
    await transporter.sendMail({
      from: `"CodeArena Support" <${user}>`,
      to,
      subject,
      text: body,
    });
    console.log(`✅ Email sent successfully to ${to}`);
    return true;
  } catch (err: any) {
    console.error(`❌ Email notification failed to send to ${to}:`, err.message);
    return false; // Return false but do NOT crash/throw!
  }
}

/**
 * Sends a permanent revocation notification email
 */
export async function sendRevocationEmail(to: string, reason?: string): Promise<boolean> {
  const subject = "Your Account Access Has Been Revoked";
  const body = `Hello,

Your account access has been revoked by an administrator.

You are no longer able to access the application using this account.
${reason ? `\nReason: ${reason}` : ""}

If you believe this action was taken incorrectly, please contact the application administrator.

Regards,
The Support Team`;

  if (!transporter) {
    console.log(`\n--- 📨 [CONSOLE EMAIL LOG] ---\nTo: ${to}\nSubject: ${subject}\nBody:\n${body}\n------------------------------\n`);
    return true;
  }

  try {
    await transporter.sendMail({
      from: `"CodeArena Support" <${user}>`,
      to,
      subject,
      text: body,
    });
    console.log(`✅ Email sent successfully to ${to}`);
    return true;
  } catch (err: any) {
    console.error(`❌ Email notification failed to send to ${to}:`, err.message);
    return false; // Return false but do NOT crash/throw!
  }
}
