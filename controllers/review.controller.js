import * as ReviewService from '../services/review.service.js';

export const createReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const { product, rating, comment } = req.body;
        const existing = await ReviewService.getUserReviewForProduct(userId, product);
        if (existing) {
            return res.status(400).json({ message: 'Ya comentaste este producto.' });
        }
        const review = await ReviewService.createReview({ user: userId, product, rating, comment });
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el comentario', error: error.message });
    }
};

export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await ReviewService.getReviewsByProduct(productId);
        res.status(200).json(reviews); 
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los comentarios', error: error.message });
    }
};

export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await ReviewService.updateReview(id, req.body);
        res.status(200).json(review);
    } catch (error) {
        res.status(200).json({ message: 'Error al actualizar el comentario', error: error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        await ReviewService.deleteReview(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el comentario', error: error.message });
    }
};

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await ReviewService.getAllReviews();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener todos los comentarios', error: error.message });
    }
};