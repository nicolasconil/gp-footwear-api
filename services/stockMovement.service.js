import * as StockMovementRepository from '../repositories/stockMovement.repository.js';
import * as ProductRepository from '../repositories/product.repository.js';

export const recordStockMovement = async (productId, size, color, quantity, movementType) => {
    const movement = {
        productId,
        size,
        color,
        quantity,
        movementType
    };
    
    await StockMovementRepository.createStockMovement(movement);
    
    await updateStock(productId, size, color, quantity, movementType);
};

export const updateStock = async (productId, size, color, quantity, movementType) => {
    const product = await ProductRepository.getProduct(productId);
    
    if (!product) throw new Error('Producto no encontrado');
    
    const variation = product.variations.find(v => v.size === size && v.color === color);
    
    if (!variation) throw new Error('Variación no encontrada');
    
    if (movementType === 'venta' && variation.stock < quantity) throw new Error('Stock insuficiente');

    variation.stock = movementType === 'venta' ? variation.stock - quantity : variation.stock + quantity;

    if (!variation.stock <= variation.stockMinimo) {
        console.log(`Alerta: Stock bajo para ${product.name} (${size}, ${color})`);
    }

    await ProductRepository.updateProductStock(productId, size, color, variation.stock);
}