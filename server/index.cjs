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

const emailLabels = {
  ro: {
    formTypeLabels: { partner: 'Formular Parteneriat', team: 'Aplicație Echipă' },
    partnerTypeLabels: {
      educational: 'ȘCOLI & UNIVERSITĂȚI',
      institutional: 'PRIMĂRII & INSTITUȚII',
      sponsor: 'SPONSORI & COMPANII',
      generic: 'CONTACT DIRECT',
    },
    departmentLabels: {
      GROWTH: 'GROWTH & PARTNERSHIPS',
      COMMS: 'BRAND & COMMUNITY',
      INNOVATION: 'URBAN INNOVATION LAB',
    },
    newSubmission: 'Formular Nou Trimis',
    formType: 'Tip Formular',
    submissionId: 'ID Trimitere',
    submittedAt: 'Trimis la',
    partnershipDetails: 'Detalii Parteneriat',
    partnerType: 'Tip Partener',
    organization: 'Organizație',
    contactName: 'Nume Contact',
    emailLabel: 'Email',
    phone: 'Telefon',
    teamApplicationDetails: 'Detalii Aplicație Echipă',
    department: 'Departament',
    message: 'Mesaj',
    subjectPartner: '[PARTENERIAT]',
    subjectTeam: '[APLICAȚIE ECHIPĂ]',
  },
  en: {
    formTypeLabels: { partner: 'Partnership Form', team: 'Team Application' },
    partnerTypeLabels: {
      educational: 'SCHOOLS & UNIVERSITIES',
      institutional: 'MUNICIPALITIES & INSTITUTIONS',
      sponsor: 'SPONSORS & COMPANIES',
      generic: 'DIRECT CONTACT',
    },
    departmentLabels: {
      GROWTH: 'GROWTH & PARTNERSHIPS',
      COMMS: 'BRAND & COMMUNITY',
      INNOVATION: 'URBAN INNOVATION LAB',
    },
    newSubmission: 'New Form Submission',
    formType: 'Form Type',
    submissionId: 'Submission ID',
    submittedAt: 'Submitted At',
    partnershipDetails: 'Partnership Details',
    partnerType: 'Partner Type',
    organization: 'Organization',
    contactName: 'Contact Name',
    emailLabel: 'Email',
    phone: 'Phone',
    teamApplicationDetails: 'Team Application Details',
    department: 'Department',
    message: 'Message',
    subjectPartner: '[PARTNERSHIP]',
    subjectTeam: '[TEAM APPLICATION]',
  },
};

app.post('/forms/submit', async (req, res) => {
  try {
    const { formType, partnerType, department, organizationName, contactName, email, phone, message, language } = req.body;

    if (!contactName || !email || !phone) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const id = `form_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const lang = language === 'en' ? 'en' : 'ro';
    const L = emailLabels[lang];

    let emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #00F0FF;">${L.newSubmission}</h2>
        <p><strong>${L.formType}:</strong> ${L.formTypeLabels[formType] || formType}</p>
        <p><strong>${L.submissionId}:</strong> ${id}</p>
        <p><strong>${L.submittedAt}:</strong> ${new Date().toISOString()}</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
    `;

    if (formType === 'partner') {
      emailHTML += `
        <h3>${L.partnershipDetails}:</h3>
        <p><strong>${L.partnerType}:</strong> ${partnerType ? (L.partnerTypeLabels[partnerType] || partnerType) : 'N/A'}</p>
        ${organizationName ? `<p><strong>${L.organization}:</strong> ${organizationName}</p>` : ''}
        <p><strong>${L.contactName}:</strong> ${contactName}</p>
        <p><strong>${L.emailLabel}:</strong> ${email}</p>
        <p><strong>${L.phone}:</strong> ${phone}</p>
      `;
    } else if (formType === 'team') {
      emailHTML += `
        <h3>${L.teamApplicationDetails}:</h3>
        <p><strong>${L.department}:</strong> ${department ? (L.departmentLabels[department] || department) : 'N/A'}</p>
        <p><strong>${L.contactName}:</strong> ${contactName}</p>
        <p><strong>${L.emailLabel}:</strong> ${email}</p>
        <p><strong>${L.phone}:</strong> ${phone}</p>
        ${message ? `<p><strong>${L.message}:</strong></p><p style="white-space: pre-wrap; background: #f5f5f5; padding: 10px; border-left: 3px solid #00F0FF;">${message}</p>` : ''}
      `;
    }

    emailHTML += `</div>`;

    let subject = '';
    if (formType === 'partner') {
      const subjectDetails = partnerType ? (L.partnerTypeLabels[partnerType] || partnerType) : 'Contact';
      subject = `${L.subjectPartner} ${subjectDetails} - ${contactName}`;
    } else if (formType === 'team') {
      const departmentName = department ? (L.departmentLabels[department] || department) : 'Unknown';
      subject = `${L.subjectTeam} ${departmentName} - ${email}`;
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
const fs = require('fs');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const PORT = IS_PRODUCTION ? 5000 : 3001;

const distPath = path.join(__dirname, '..', 'frontend', 'dist');
const distExists = fs.existsSync(path.join(distPath, 'index.html'));

if (IS_PRODUCTION || distExists) {
  app.use(express.static(distPath));
  app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT} (${IS_PRODUCTION ? 'production' : 'development'})`);
});
