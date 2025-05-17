import StockMovement from "../models/stockMovement.model.js";

export const createStockMovement = async (data) => {
    const movement = new StockMovement(data);
    return await movement.save();
};

export const getStockMovementsByProduct = async (productId) => {
    return await StockMovement.find({ productId }).sort({ date: -1 });
};