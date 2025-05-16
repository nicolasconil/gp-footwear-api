import * as PromotionService from '../services/promotion.service.js';
import * as UserService from '../services/user.service.js';

export const sendPromotions = async (req, res) => {
    try {
        const emailList = await UserService.getSubscribers();
        const { subject, content } = req.body;
        if (!emailList || emailList.length === 0) {
            return res.status(400).json({ message: 'No hay suscriptos'});
        }
        await PromotionService.sendPromotionalEmail(emailList, subject, content);
        res.status(200).json({ message: 'Correos promocionales enviados correctamente.' });
    } catch (error) {
        res.status(500).json({ message: `Error al enviar correos promocionales: ${error.message}` });
    }
;}