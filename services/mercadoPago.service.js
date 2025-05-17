import { MercadoPagoConfig } from 'mercadopago';
import dotenv from 'dotenv';
import * as OrderService from '../services/order.service.js';

dotenv.config();

const mpConfig = new MercadoPagoConfig({
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
        const result = await mpConfig.createPaymentPreference(preference);
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
        const payment = await mpConfig.payment.findById(paymentId);
        const { status, payment_type_id, transaction_amount, external_reference } = payment.body;
        console.log(
            `📦 Pago recibido:
            🆔 ID: ${paymentId}
            🧾 Orden: ${externalReference}
            💳 Estado: ${status}`);
        await OrderService.updatePaymentInfo(external_reference, {
            paymentId,
            payment_type: payment_type_id,
            transaction_amount,
            status
        });
        return {
            status,
            orderId: external_reference
        }
    } catch (error) {
        console.error('Error al procesar la notificación de pago: ', error.message);
        throw new Error('Error al procesar la notificación de pago');
    }
};