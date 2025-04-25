import mercadopago from 'mercadopago';
import dotenv from 'dotenv';
import * as OrderService from '../services/order.service.js';

dotenv.config();

mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN
});

export const createPaymentPreference = async ({ products, orderId, email}) => {
    try {
        const items = products.map(p => ({
            title: p.title,
            quantity: p.quantity,
            unit_price: Number(p.price),
            currency_id: 'ARS'
        }));
        const preference = {
            items,
            external_reference: orderId,
            payer: {
                email: email || 'comprador@example.com'
            },
            back_urls: {
                success: `${process.env.CLIENT_URL}/success`,
                failure: `${process.env.CLIENT_URL}/failure`,
                pending: `${process.env.CLIENT_URL}/pending`
            },
            auto_return: 'approved',
            notification_url: `${process.env.BACKEND_URL}/api/webhook/mercadopago`
        };
        const result = await mercadopago.preferences.create(preference);
        return {
            init_point: result.body.init_point,
            preferenceId: result.body.id
        };
    } catch (error) {
        console.error('Error al crear la preferencia de pago: ', error.message);
        throw new Error('Error al generar la preferencia de pago');
    }
};

export const processPaymentNotification = async (paymentId) => {
    try {
        const payment = await mercadopago.payment.findById(paymentId);
        const status = payment.body.status;
        const externalReference = payment.body.external_reference;
        console.log(
            `📦 Pago recibido:
            🆔 ID: ${paymentId}
            🧾 Orden: ${externalReference}
            💳 Estado: ${status}`);
        await OrderService.updatePaymentInfo(externalReference, {
            paymentId,
            payment_type: payment_type_id,
            transaction_amount,
            status
        });
        return {
            status,
            orderId: externalReference
        }
    } catch (error) {
        console.error('Error al procesar la notificación de pago: ', error.message);
        throw new Error('Error al procesar la notificación de pago');
    }
};