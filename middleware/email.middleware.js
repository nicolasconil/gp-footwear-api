import nodemailer from 'nodemailer';
import { verificationEmailTemplate, orderConfirmationEmailTemplate, sendShippingNotificationEmailTemplate } from '../utils/emailTemplates';

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

export const sendVerificationEmail = async (email, name, verificationUrl) => {
    const { subject, text, html } = verificationEmailTemplate(name, verificationUrl);
    await sendEmail({
        to: email,
        subject,
        html
    });
};

export const sendOrderConfirmationEmail = async (email, name, orderId, total, shippingCost, pdfPath) => {
    const { subject, text, html } = orderConfirmationEmailTemplate(orderId);
    await sendEmail({
        to: email,
        subject,
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
    await sendEmail({
        to: email,
        subject,
        html
    });
};