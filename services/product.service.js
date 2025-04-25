import * as ProductRepository from '../repositories/product.repository.js';

export const getAll = async (name = '') => {
    return await ProductRepository.getAllProducts(name);
};

export const getById = async (id) => {
    const product = await ProductRepository.getProduct(id);
    
    if (!product) {
        throw new Error('Producto no encontrado');
    }
    
    return product;
};

export const create = async (data) => {
    const requiredFields = ['name', 'price', 'image', 'gender', 'variations'];
    for (const field of requiredFields) {
        if (!data[field]) {
            throw new Error(`Falta el campo obligatorio: ${field}`);
        }
    }
    if (data.price < 0) {
        throw new Error('El precio no puede ser negativo');
    }
    if (!Array.isArray(data.variations) || data.variations.length === 0) {
        throw new Error('Debe incluir al menos una variación');
    }
    for (const variation of data.variations) {
        if (!variation.size || !variation.color || variation.stock == null) {
            throw new Error('Cada variación debe tener talle, color y stock');
        }
        if (variation.stock < 0) {
            throw new Error('El stock de una variación no puede ser negativo');
        }
    }

    data.name = data.name.trim().toLowerCase();
    
    const existing = await ProductRepository.getAllProducts(data.name);
    const duplicated = existing.some(p => p.gender === data.gender);
    if (duplicated) throw new Error('Ya existe un producto con ese nombre y género');

    return await ProductRepository.createProduct(data);
};

export const update = async (id, data) => {    
    if ('price' in data && data.price < 0) {
        throw new Error('El precio no puede ser negativo');
    }

    if ('variations' in data) {
        for (const variation of data.variations) {
            if (!variation.size || !variation.color || variation.stock == null) {
                throw new Error('Cada variación debe tener talle, color y stock');
            }
            if (variation.stock < 0) {
                throw new Error('El stock es una variación no puede ser negativo');
            }
        }
    }
    
    const product = await ProductRepository.updateProduct(id, data)
    if (!product) throw new Error('Producto no encontrado');

    return product;
};

export const remove = async (id) => {
    const product = await ProductRepository.getProduct(id);
    
    if (!product) {
        throw new Error('Producto no encontrado');
    }
    
    if (product.variations.some(v => v.stock > 0)) {
        throw new Error('No se puede eliminar un producto con stock disponible');
    }
    
    return await ProductRepository.deleteProduct(id);
};
