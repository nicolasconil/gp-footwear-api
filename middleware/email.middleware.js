import nodemailer from 'nodemailer';
import { verificationEmailTemplate, orderConfirmationEmailTemplate } from '../utils/emailTemplates';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
 
export const sendEmail = async ({ to, subject, html, attachments = [] }) => {
    const mailOptions = {
        from: `'GP Footwear' <${process.env.EMAIL_USER}>`,
        to, 
        subject,
        html,
        attachments
    };
    await transporter.sendMail(mailOptions);
}

export const sendVerificationEmail = async (email, verificationUrl) => {
    const html = verificationEmailTemplate(verificationUrl);
    await sendEmail({
        to: email,
        subject: 'Verificación de correo',
        html
    });
};

export const sendOrderConfirmationEmail = async (email, orderId, pdfPath) => {
    const html = orderConfirmationEmailTemplate(orderId);
    await sendEmail({
        to: email,
        subject: 'Confirmación de pedido',
        html,
        attachments: [
            {
                filename: `factura-${orderId}.pdf`,
                path: pdfPath,
            },
        ], 
    });
};

export const sendShippingNotificationEmail = async (email, name, orderId, trackingNumber, carrier) => {
    const { subject, text, html } = sendShippingNotificationEmailTemplate (name, orderId, trackingNumber, carrier);
    await sendEmail(email, subject, text, html);
};