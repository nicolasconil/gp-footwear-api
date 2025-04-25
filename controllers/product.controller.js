import * as ProductService from '../services/product.service.js';

export const getAll = async (req, res) => {
    try {
        const name = req.query.name || '';
        const products = await ProductService.getAll(name);
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: `Error al obtener los productos: ${error.message}` });
    }
};

export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductService.getById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: `Producto no encontrado: ${error.message}` });
    }
};

export const create = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = `/uploads/${req.file.filename}`;
        }
        const newProduct = await ProductService.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: `Error al crear el producto: ${error.message}` });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.file) {
            req.body.image = `/uploads/${req.file.filename}`;
        }
        const updateProduct = await ProductService.update(id, req.body);
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(400).json({ message: `Error al actualizar el producto: ${error.message}` });
    }
};

export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ProductService.remove(id);
        res.status(200).json({ message: 'Producto eliminado correctamente', product: deleted });
    } catch (error) {
        res.status(400).json({ message: `Error al eliminar el producto: ${error.message}` });
    }
};

export const reduceStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        if (quantity < 0 || isNaN(quantity)) {
            res.status(400).json({ message: 'La cantidad debe ser un número válido o mayor que 0'})
        }
        const updated = await ProductService.reduceStock(id, quantity);
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: `Error al reducir el stock: ${error.message}` });
    }
};