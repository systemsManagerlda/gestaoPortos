// emailService.ts
export interface EmailData {
  emailTo: string;
  emailSubject: string;
  emailBody: string;
  attachments?: File[];
}

export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    const hasAttachments =
      Array.isArray(emailData.attachments) &&
      emailData.attachments.length > 0;

    let body: BodyInit;
    let headers: HeadersInit | undefined;

    if (hasAttachments) {
      const formData = new FormData();

      formData.append("emailTo", emailData.emailTo);
      formData.append("emailSubject", emailData.emailSubject);
      formData.append("emailBody", emailData.emailBody);

      emailData.attachments!.forEach((file, index) => {
        formData.append(`attachment${index}`, file);
      });

      body = formData;
      headers = undefined; // o browser define automaticamente
    } else {
      body = JSON.stringify({
        emailTo: emailData.emailTo,
        emailSubject: emailData.emailSubject,
        emailBody: emailData.emailBody,
      });

      headers = {
        "Content-Type": "application/json",
      };
    }

    const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/enviarEmail", {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar e-mail");
    }

    const result = await response.json();
    console.log("E-mail enviado:", result);

    return true;
  } catch (error) {
    console.error("Erro no envio de e-mail:", error);
    return false;
  }
};
