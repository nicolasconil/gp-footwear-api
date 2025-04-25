import * as OrderService from '../services/order.service.js';

export const createOrder = async (req, res) => {
    try {
        const orderData = {
            ...req.body,
            user: req.user?._id || null
        };
        const order = await OrderService.create(orderData);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: `No se pudo crear la orden: ${error.message}`});
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderService.getAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });       
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await OrderService.getById(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated = await OrderService.updateStatus(id, status);
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await OrderService.remove(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await OrderService.getOrdersByUserId(userId);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: `Error al obtener tus órdenes: ${error.message}` });
    }
};

export const cancelMyOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await OrderService.getById(id);
        if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
        if (!order.user || order.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No autorizado para cancelar esta orden' });
        }
        if (order.status !== 'pendiente') {
            return res.status(400).json({ message: `No se puede cancelar una orden con estado: ${order.status}` });
        }
        const updatedOrder = await OrderService.updateStatus(id, 'cancelado');
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: `Error al cancelar la compra: ${error.message} `});
    }
};