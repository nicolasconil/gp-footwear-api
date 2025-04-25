import * as StockMovementService from '../services/stockMovement.service.js';

export const recordStockMovement = async (req, res) => {
    try {
        const { productId, size, color, quantity, movementType } = req.body;
        if (!productId || !size || !color || quantity == null || !movementType) {
            return res.status(400).json({ message: 'Faltan campos obligatorios en la solicitud' });
        }
        if (quantity <= 0 || isNaN(quantity)) {
            return res.status(400).json({ message: 'La cantidad debe ser un número válido o mayor que 0' });
        }
        if (!['venta', 'ingreso'].includes(movementType)) {
            return res.status(400).json({ message: 'El tipo de movimiento debe ser "venta" o "ingreso"' });
        }
        await StockMovementService.recordStockMovement(productId, size, color, quantity, movementType);
        res.status(201).json({ message: 'Movimiento de stock registrado y stock actualizado correctamente'});
    } catch (error) {
        res.status(500).json({ message: `Error al registrar el movimiento de stock: ${error.message}` });
    }
};