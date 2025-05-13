import Review from '../models/review.model.js';

export const create = async (data) => {
    return await Review.create(data);
};

export const update = async (id, data) => {
    return await Review.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id) => {
    return await Review.findByIdAndDelete(id);
};

export const findByProduct = async (productId) => {
    return await Review.find({ product: productId }).populate('user', 'name');
};

export const findByUserAndProduct = async (userId, productId) => {
    return await Review.findOne({ user: userId, product: productId });
};

export const findById = async (id) => {
    return await Review.findById(id);
};

export const getAll = async () => {
    return await Review.find().populate('user', 'name').populate('product', 'name');
};