import Order from '../models/order.model,js';

export const createOrder = async (data) => {
    return await Order.create(data);
};

export const getAllOrders = async () => {
    return await Order.find().populate('user').populate('products.product');
};

export const getOrderById = async (id) => {
    return await Order.findById(id).populate('user').populate('products.product');
};

export const updateOrderStatus = async (id, status) => {
    return await Order.findByIdAndUpdate(id, { status }, { new: true });
};

export const deleteOrder = async (id) => {
    return await Order.findByIdAndDelete(id);
};

export const getOrdersByUserId = async (userId) => {
    return await Order.find({ user: userId}).populate('items.product');
};

export const updateOrder = async (id, updateData) => {
    return await Order.findByIdAndUpdate(id, updateData, { new: true });
};