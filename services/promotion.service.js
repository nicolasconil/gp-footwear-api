import { sendEmail } from "../middleware/email.middleware.js";
import { promoEmailTemplate } from "../utils/emailTemplates.js";

export const sendPromotionalEmail = async (emailList, subject, content) => {
    const html = promoEmailTemplate(subject, content);
    for (const email of emailList) {
        try {
            await sendEmail(email, subject, html);
            console.log(`Correo promocional enviado a: ${email}`);
        } catch (error) {
            console.error(`Error al enviar el correo promocional a ${email}: `, error);
        }
    };
};