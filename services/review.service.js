import * as ReviewRepository from '../repositories/review.repository.js';

export const createReview = async (data) => {
    return await ReviewRepository.create(data);
};

export const updateReview = async (id, data) => {
    return await ReviewRepository.update(id, data);
};

export const deleteReview = async (id) => {
    return await ReviewRepository.remove(id);
};

export const getReviewsByProduct = async (productId) => {
    return await ReviewRepository.findByProduct(productId);
};

export const getUserReviewForProduct = async (userId, productId) => {
    return await ReviewRepository.findByUserAndProduct(userId, productId);
};

export const getAllReviews = async () => {
    return await ReviewRepository.getAll();
}