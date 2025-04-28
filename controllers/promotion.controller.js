import * as PromotionService from '../services/promotion.service.js';

export const sendPromotions = async (req, res) => {
    try {
        const { emailList, subject, content } = req.body;
        if (!emailList || !Array.isArray(emailList) || emailList.length === 0) {
            return res.status(400).json({ message: 'Debe proporcionar una lista válida de correos electrónicos.'});
        }
        if (!subject || !content) {
            return res.status(400).json({ message: 'El asunto y el contenido del correo son requeridos.'});
        }
        await PromotionService.sendPromotionalEmail(emailList, subject, content);
        res.status(200).json({ message: 'Correos promocionales enviados correctamente.' });
    } catch (error) {
        res.status(500).json({ message: `Error al enviar correos promocionales: ${error.message}` });
    }
;}