import * as OrderRepository from '../repositories/order.repository.js';
import { generateInvoice } from '../utils/invoiceGenerator.js';
import { sendOrderConfirmationEmail } from '../middleware/email.middleware.js';
import path from 'path';

export const create = async (orderData) => {
    const order = await OrderRepository.createOrder(orderData);
    try {
        const invoicePath = path.resolve(
            process.cwd(),
            'invoices',
            `factura-${order._id}.pdf`
        );
        await generateInvoice(order, invoicePath);
        if (order.user) {
            await sendOrderConfirmationEmail(
                order.user.email,
                order._id,
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
    return await OrderRepository.updateOrder(orderId, updateData);    
};