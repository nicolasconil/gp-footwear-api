import * as PaymentService from '../services/payment.service.js';

export const createManualPreference = async (req, res) => { // crea una preferencia de pago manual (reserva la orden y método)
    try {
        const preference = await PaymentService.createManualPreference(req.body);
        res.status(200).json(preference);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la preferencia', error: error.message });
    }
};

export const registerManualPayment = async (req, res) => { // registra el pago manual luego de que el cliente haya pagado (ej: envía el comprobante)
    try {
        const { orderId, method, paymentDetails } = req.body;
        if (!orderId || !method || !paymentDetails) {
            return res.status(400).json({ message: 'Faltan datos obligatorios para registrar el pago', error: error.message });
        }
        const updatedOrder = await PaymentService.registerManualPayment(orderId, method, paymentDetails);
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el pago', error: error.message });
    }
};

export const webhook = async (req, res) => { // webhook (envío de notificaciones manuales desde otra plataforma)
    try {
        await PaymentService.handleWebhook(req.body);
        res.status(200).json({ received: true });
    } catch (error) {
        res.status(500).json({ message: 'Error con el envío de notificaciones', error: error.message });
    }
};