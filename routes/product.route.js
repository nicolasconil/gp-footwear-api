import express from 'express';
import * as ProductController from '../controllers/product.controller.js';
import { createProductValidation, updateProductValidation } from '../middleware/validations/product.validation.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestión de productos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrar por nombre
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/products', ProductController.getAll);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get('/products/:id', ProductController.getById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *               - image
 *               - size
 *               - gender
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               image:
 *                 type: string
 *               size:
 *                 type: array
 *                 items:
 *                   type: number
 *               gender:
 *                 type: string
 *                 enum: [hombre, mujer, niños, unisex]
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post('/products', verifyToken, verifyAdmin, createProductValidation, upload.single('image'), ProductController.create);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               image:
 *                 type: string
 *               size:
 *                 type: array
 *                 items:
 *                   type: number
 *               gender:
 *                 type: string
 *                 enum: [hombre, mujer, niños, unisex]
 *     responses:
 *       200:
 *         description: Producto actualizado
 */
router.put('/products/:id', verifyToken, verifyAdmin, updateProductValidation, upload.single('image'), ProductController.update);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       204:
 *         description: Producto eliminado
 */
router.delete('/products/:id', verifyToken, verifyAdmin, ProductController.remove);

/**
 * @swagger
 * /api/products/{id}/reduce-stock:
 *   patch:
 *     summary: Reducir stock de un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Stock reducido
 */
router.patch('/products/:id/reduce-stock', verifyToken, verifyAdmin, ProductController.reduceStock);

export default router;