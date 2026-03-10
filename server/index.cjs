const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'mail.scapelabs.io',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: parseInt(process.env.SMTP_PORT || '587') === 465,
    auth: {
      user: process.env.SMTP_USER || 'asociatie@scapelabs.io',
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

app.post('/forms/submit', async (req, res) => {
  try {
    const { formType, partnerType, department, organizationName, contactName, email, phone, message } = req.body;

    if (!contactName || !email || !phone) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const id = `form_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const formTypeLabels = {
      partner: 'Partnership Form',
      team: 'Team Application',
    };

    const partnerTypeLabels = {
      educational: 'ȘCOLI & UNIVERSITĂȚI',
      institutional: 'PRIMĂRII & INSTITUȚII',
      sponsor: 'SPONSORI & COMPANII',
      generic: 'CONTACT DIRECT',
    };

    const departmentLabels = {
      GROWTH: 'GROWTH & PARTNERSHIPS',
      COMMS: 'BRAND & COMMUNITY',
      INNOVATION: 'URBAN INNOVATION LAB',
    };

    let emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #00F0FF;">New Form Submission</h2>
        <p><strong>Form Type:</strong> ${formTypeLabels[formType] || formType}</p>
        <p><strong>Submission ID:</strong> ${id}</p>
        <p><strong>Submitted At:</strong> ${new Date().toISOString()}</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
    `;

    if (formType === 'partner') {
      emailHTML += `
        <h3>Partnership Details:</h3>
        <p><strong>Partner Type:</strong> ${partnerType ? (partnerTypeLabels[partnerType] || partnerType) : 'N/A'}</p>
        ${organizationName ? `<p><strong>Organization:</strong> ${organizationName}</p>` : ''}
        <p><strong>Contact Name:</strong> ${contactName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
      `;
    } else if (formType === 'team') {
      emailHTML += `
        <h3>Team Application Details:</h3>
        <p><strong>Department:</strong> ${department ? (departmentLabels[department] || department) : 'N/A'}</p>
        <p><strong>Contact Name:</strong> ${contactName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${message ? `<p><strong>Message:</strong></p><p style="white-space: pre-wrap; background: #f5f5f5; padding: 10px; border-left: 3px solid #00F0FF;">${message}</p>` : ''}
      `;
    }

    emailHTML += `</div>`;

    let subject = '';
    if (formType === 'partner') {
      const subjectDetails = partnerType ? (partnerTypeLabels[partnerType] || partnerType) : 'Contact';
      subject = `[PARTNERSHIP] ${subjectDetails} - ${contactName}`;
    } else if (formType === 'team') {
      const departmentName = department ? (departmentLabels[department] || department) : 'Unknown';
      subject = `[TEAM APPLICATION] ${departmentName} - ${email}`;
    }

    const transporter = createTransporter();
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'asociatie@scapelabs.io',
      to: process.env.RECIPIENT_EMAIL || 'asociatie@scapelabs.io',
      subject,
      html: emailHTML,
    });

    res.json({ success: true, id });
  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({ success: false, error: 'Failed to send email. Please try again later.' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const path = require('path');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const PORT = IS_PRODUCTION ? 5000 : 3001;

if (IS_PRODUCTION) {
  const distPath = path.join(__dirname, '..', 'frontend', 'dist');
  app.use(express.static(distPath));
  app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT}`);
});
