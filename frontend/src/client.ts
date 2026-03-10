export interface SubmitFormRequest {
  formType: "partner" | "team";
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

class FormsServiceClient {
  async submit(params: SubmitFormRequest): Promise<SubmitFormResponse> {
    const resp = await fetch("/forms/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    if (!resp.ok) {
      let message = `request failed: status ${resp.status}`;
      try {
        const text = await resp.text();
        message += ": " + text;
      } catch {}
      throw new Error(message);
    }

    return resp.json();
  }
}

const client = {
  forms: new FormsServiceClient(),
};

export default client;
