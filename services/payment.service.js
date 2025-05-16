import mercadopago from 'mercadopago';
import * as OrderService from '../services/order.service.js';
import path from 'path';
import { decryptText } from '../utils/encryption.js';
import { generateInvoice } from '../utils/invoiceGenerator.js';
import { sendOrderConfirmationEmail } from '../middleware/email.middleware.js';

export const createManualPreference = async ({ products, email, orderId }) => {
    const items = products.map((product) => ({
        title: product.title,
        quantity: product.quantity,
        unit_price: product.price
    }));
    const preference = {
        items, 
        payer: { email },
        external_reference: orderId,
        back_urls: {
            success: 'https://tusitio.com/success',
            failure: 'https://tusitio.com/failure',
            pending: 'https://tusitio.com/pending',
        },
        notification_url: 'https://tusitio.com/api/payments/webhook'
    };
    const response = await mercadopago.preferences.create(preference);
    return response.body;
};

export const registerManualPayment = async (orderId, method, paymentDetails) => {
    const paymentInfo = {
        status: 'pagado',
        method,
        paymentDetails,
        date: new Date()
    };
    const order = await OrderService.updatePaymentInfo(orderId, paymentInfo);
    return order;
};

export const handleWebhook = async (body) => {
    const { data, type } = body;
    if (type === 'payment') {
        const payment = await mercadopago.payment.findById(data.id);
        const externalRef = payment.body.external_reference;
        const status = payment.body.status;
        await OrderService.updatePaymentInfo(externalRef, {
            status, 
            method: 'mercadopago',
            paymentId: data.id
        });
    }
};