import { secret } from "encore.dev/config";
import nodemailer from "nodemailer";

const smtpHost = secret("SMTPHost");
const smtpPort = secret("SMTPPort");
const smtpUser = secret("SMTPUser");
const smtpPassword = secret("SMTPPassword");
const smtpFrom = secret("SMTPFrom");
const recipientEmail = secret("RecipientEmail");

export async function sendEmail(params: {
  subject: string;
  html: string;
}): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: smtpHost(),
    port: parseInt(smtpPort()),
    secure: parseInt(smtpPort()) === 465,
    auth: {
      user: smtpUser(),
      pass: smtpPassword(),
    },
  });

  await transporter.sendMail({
    from: smtpFrom(),
    to: recipientEmail(),
    subject: params.subject,
    html: params.html,
  });
}
