import * as OrderRepository from '../repositories/order.repository.js';
import { generateInvoice } from '../utils/invoiceGenerator.js';
import { sendOrderConfirmationEmail, sendShippingNotificationEmail } from '../middleware/email.middleware.js';
import path from 'path';
import { decryptText } from '../utils/encryption.js';

export const create = async (orderData) => {
    const order = await OrderRepository.createOrder({ ...orderData, shippingCost });
    try {
        const invoicePath = path.resolve(
            process.cwd(),
            'invoices',
            `factura-${order._id}.pdf`
        );
        await generateInvoice(order, invoicePath);
        if (order.user && order.user.email) {
            const decryptedEmail = decryptText(order.user.email); // desencripta el email
            await sendOrderConfirmationEmail(
                decryptedEmail,
                order._id,
                order.totalAmount,
                invoicePath
            );
        }
    } catch (error) {
        console.error('Error generando/enviando factura: ', error);
    }
    return order;
};

export const getAll = async () => {
    return await OrderRepository.getAllOrders();
};

export const getById = async (id) => {
    const order = await OrderRepository.getOrderById(id);
    if (!order) throw new Error('Pedido no encontrado');
    return order;
};

export const updateStatus = async (id, status) => {
    return await OrderRepository.updateOrderStatus(id, status);
};

export const remove = async (id) => {
    return await OrderRepository.deleteOrder(id);
};

export const getOrdersByUserId = async (userId) => {
    return await OrderRepository.getOrdersByUserId(userId);
};

export const updatePaymentInfo = async (orderId, paymentInfo) => {
    const updateData = {
        status: paymentInfo.status,
        payment: paymentInfo
    };
    const updatedOrder = await OrderRepository.updateOrder(orderId, updateData);
    if (oaymentInfo.status === 'approved') {
        await processAfterOrder(updatedOrder);
    }
    return updatedOrder;    
};

export const updateFields = async (id, fields) => {
    const updateOrder = await OrderRepository.updateOrder(id, fields);
    if (fields.status && (fields.status === 'enviado' || fields.status === 'entregado')) {
        try {
            if (updateOrder.user && updateOrder.user.email) {
                const decryptedEmail = decryptText(updateOrder.user.email);
                await sendShippingNotificationEmail (
                    decryptedEmail,
                    updateOrder._id,
                    updateOrder.shippingTrackingNumber,
                    updateOrder.shippingMethod
                );
            }
        } catch (error) {
            console.error('Error enviando la notificación de envío: ', error);
        }
    };
    return updateOrder;
};

export const dispatchOrder = async (id, shippingTrackingNumber) => {
    const order = await OrderRepository.dispatchOrder(id, shippingTrackingNumber);
    if (!order) {
        throw new Error('Orden no encontrada para despachar');
    }
    try {
        if (order.user && order.user.email) {
            const decryptedEmail = decryptText(order.user.email);
            await sendShippingNotificationEmail(
                decryptedEmail,
                order._id,
                order.shippingTrackingNumber,
                order.shippingMethod
            );
        }
    } catch (error) {
        console.error('Error enviando email de despacho: ', error);
    }
    return order;
};

export const processAfterOrder = async (order) => {
    try {
        const invoicePath = path.resolve(
            proccess.cwd(),
            'invoices',
            `factura-${order._id}.pdf`
        );
        await generateInvoice(order, invoicePath);
        if (order.user && order.user.email) {
            const decryptedEmail = decryptText(order.user.email);
            await sendOrderConfirmationEmail(
                decryptedEmail,
                order._id,
                order.totalAmount,
                invoicePath
            );
        }
    } catch (error) {
        console.error('Error en el processAfterOrder', error);
    }
}