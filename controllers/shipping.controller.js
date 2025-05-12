import * as ShippingService from '../services/shipping.service.js';

export const createShipping = async (req, res) => {
    try {
        const shippingData = req.body;
        const shipping = await ShippingService.createShipping(shippingData);
        res.status(201).json(shipping);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el envío.', error: error.message });
    }
};

export const getAllShippings = async (req, res) => {
    try {
        const shippings = await ShippingService.getAllShippings();
        res.status(200).json(shippings);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los envíos.', error: error.message });
    }
};

export const getShippingByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;
        const shipping = await ShippingService.getShippingByOrderId(orderId);
        if (!shipping) {
            return res.status(404).json({ message: 'Envío no encontrado.' });
        }
        res.status(200).json(shipping);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el envío.', error: error.message });
    }
};

export const updateShippingStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const updatedShipping = ShippingService.updateShippingStatus(orderId, status);
        if (!updatedShipping) {
            return res.status(404).json({ message: 'Envío no encontrado.' });
        }
        res.status(200).json(updatedShipping); 
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado del envío.', error: error.message });        
    }
};

export const updateShipping = async (req, res) => {
    try {
        const { orderId } = req.params;
        const updateData = req.body;
        const updatedShipping = await ShippingService.updateShipping(orderId, updateData);
        if (!updatedShipping) {
            return res.status(404).json({ message: 'Envío no encontrado.' });
        }
        res.status(200).json(updatedShipping);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el envío.', error: error.message });
    }
};

export const deleteShipping = async (req, res) => {
    try {
        const { orderId } = req.params;
        const deletedShipping = await ShippingService.deleteShipping(orderId);
        if (!deletedShipping) {
            return res.status(404).json({ message: 'Envío no encontrado.' });
        }
        res.status(200).json({ message: 'Envío eliminado correctamente.' }); 
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el envío.', error: error.message });
    }
};