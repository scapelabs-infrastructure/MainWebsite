import { api } from "encore.dev/api";
import { sendEmail } from "../email/send";

export type FormType = "partner" | "team";

export interface SubmitFormRequest {
  formType: FormType;
  partnerType?: string;
  department?: string;
  organizationName?: string;
  contactName: string;
  email: string;
  phone: string;
  message?: string;
}

export interface SubmitFormResponse {
  success: boolean;
  id: string;
}

export const submit = api<SubmitFormRequest, SubmitFormResponse>(
  { expose: true, method: "POST", path: "/forms/submit" },
  async (req): Promise<SubmitFormResponse> => {
    const id = `form_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    const formTypeLabels: Record<FormType, string> = {
      partner: "Partnership Form",
      team: "Team Application",
    };

    const partnerTypeLabels: Record<string, string> = {
      educational: "ȘCOLI & UNIVERSITĂȚI",
      institutional: "PRIMĂRII & INSTITUȚII",
      sponsor: "SPONSORI & COMPANII",
      generic: "CONTACT DIRECT",
    };

    const departmentLabels: Record<string, string> = {
      GROWTH: "GROWTH & PARTNERSHIPS",
      COMMS: "BRAND & COMMUNITY",
      INNOVATION: "URBAN INNOVATION LAB",
    };

    let emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #00F0FF;">New Form Submission</h2>
        <p><strong>Form Type:</strong> ${formTypeLabels[req.formType]}</p>
        <p><strong>Submission ID:</strong> ${id}</p>
        <p><strong>Submitted At:</strong> ${new Date().toISOString()}</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
    `;

    if (req.formType === "partner") {
      emailHTML += `
        <h3>Partnership Details:</h3>
        <p><strong>Partner Type:</strong> ${req.partnerType ? partnerTypeLabels[req.partnerType] || req.partnerType : "N/A"}</p>
        ${req.organizationName ? `<p><strong>Organization:</strong> ${req.organizationName}</p>` : ""}
        <p><strong>Contact Name:</strong> ${req.contactName}</p>
        <p><strong>Email:</strong> ${req.email}</p>
        <p><strong>Phone:</strong> ${req.phone}</p>
      `;
    } else if (req.formType === "team") {
      emailHTML += `
        <h3>Team Application Details:</h3>
        <p><strong>Department:</strong> ${req.department ? departmentLabels[req.department] || req.department : "N/A"}</p>
        <p><strong>Contact Name:</strong> ${req.contactName}</p>
        <p><strong>Email:</strong> ${req.email}</p>
        <p><strong>Phone:</strong> ${req.phone}</p>
        ${req.message ? `<p><strong>Message:</strong></p><p style="white-space: pre-wrap; background: #f5f5f5; padding: 10px; border-left: 3px solid #00F0FF;">${req.message}</p>` : ""}
      `;
    }

    emailHTML += `</div>`;

    if (req.formType === "partner") {
      const subjectPrefix = "[PARTNERSHIP]";
      const subjectDetails = req.partnerType ? partnerTypeLabels[req.partnerType] || req.partnerType : "Contact";
      
      try {
        await sendEmail({
          subject: `${subjectPrefix} ${subjectDetails} - ${req.contactName}`,
          html: emailHTML,
        });
      } catch (error) {
        console.error("Failed to send email:", error);
        throw new Error("Failed to send email. Please check SMTP configuration.");
      }
    } else if (req.formType === "team") {
      const subjectPrefix = "[TEAM APPLICATION]";
      const departmentName = req.department ? departmentLabels[req.department] || req.department : "Unknown";
      
      try {
        await sendEmail({
          subject: `${subjectPrefix} ${departmentName} - ${req.email}`,
          html: emailHTML,
        });
      } catch (error) {
        console.error("Failed to send email:", error);
        throw new Error("Failed to send email. Please check SMTP configuration.");
      }
    }
    
    return {
      success: true,
      id,
    };
  }
);
