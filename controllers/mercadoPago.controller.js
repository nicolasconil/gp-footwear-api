import * as MPService from '../services/mercadoPago.service.js';
import * as OrderService from '../services/order.service.js';

// crear preferencia de pago
export const createPreference = async (req, res) => {
    try {
        const { products, email, orderId } = req.body;
        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'Debe enviar al menos un producto' });
        }
        const { init_point, preferenceId } = await MPService.createPaymentPreference({  // llama al servicio con orderId opcional
            products,
            email,
            orderId
        }); 
        res.status(200).json({ init_point, preferenceId });
    } catch (error) {
        console.error('Error al crear la preferencia de Mercado Pago: ', error.message);
        res.status(500).json({ message: 'Error al crear la preferencia de pago', error: error.message });
    }
};

// webhook para recibir notificaciones de Mercado Pago
export const webhookNotification = async (req, res) => {
    try {
        let paymentId;
        let type;
        if (req.method === 'GET') {
            paymentId = req.query['data.id'];
            type = req.query.type;
        } else if (req.method === 'POST') {
            paymentId = req.body.data?.id;
            type = req.body.type;
        }
        if (type === 'payment' && paymentId) {
            const mpPayment = await MPService.processPaymentNotification(paymentId);
            const status = mpPayment.status;
            const orderId = mpPayment.external_reference;
            if (!orderId) {
                return res.status(400).json({ message: 'Webhook recibido sin external_reference', error: error.message });
            }
            if (status === 'approved') {
                const order = await OrderService.updateStatus(orderId, 'pagado');
                
            }
        }
        res.sendStatus(200); // IMPORTANTE: siempre responder 200 (OK) para que Mercado Pago no vuelva a intentar.
    } catch (error) {
        console.error('Error en el webjook de Mercado Pago: ', error.message);
        res.sendStatus(500);
    }
};
