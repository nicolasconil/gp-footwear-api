import express from "express";
import * as ReviewController from '../controllers/review.controller.js';
import { verifyAdmin, verifyToken } from "../middleware/auth.middleware.js";
import { csrfProtection } from '../middleware/csrf.middleware.js';
import { reviewIdParamValidation, reviewValidation } from "../middleware/validations/review.validation.js";

const router = express.Router();

router.post('/', verifyToken, csrfProtection, reviewValidation, ReviewController.createReview); // crea una review (usuarios registrados)
router.get('/product/:productId', ReviewController.getProductReviews); // obtiene todas las reviews de un producto
router.get('/', verifyToken, verifyAdmin, ReviewController.getAllReviews); // obtiene todas las review (administrador)
router.patch('/:reviewId', verifyToken, csrfProtection, reviewIdParamValidation, reviewValidation, ReviewController.updateReview); // edita una review (solo el autor)
router.delete('/:reviewId', verifyToken, csrfProtection, reviewIdParamValidation, ReviewController.deleteReview); // elimina la review (autor o administrador)

export default router;