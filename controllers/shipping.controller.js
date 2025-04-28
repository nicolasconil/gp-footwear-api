import * as ShippingService from '../services/shipping.service.js';

export const calculate = async (req, res) => {
    try {
        const { postalCode } = req.body;
        if (!postalCode) {
            return res.status(400).json({ message: 'El código postal es obligatorio' });
        }
        const cost = await ShippingService.calculateShippingCost(postalCode);
        res.json({ cost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};