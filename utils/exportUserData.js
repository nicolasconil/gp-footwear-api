// archivo al que se le delega la exportación. (obtiene los datos del usuario desde el servicio, se desencriptan y después las envia a las funciones generadoras para crear el archivo adecuado)
import * as UserService from '../services/user.service.js';
import { decryptUserFields } from "./dataPrivacity.js";
import { generatePDFBuffer, generateCSV, generateJSON } from './generators.js';

export const exportUserDataFile = async (userId, format) => {
    const user = await UserService.getById(userId); // obtiene el usuario desde la base de datos
    const decryptedUser = decryptUserFields(user.toObject()); // desencriptar los datos sensibles
    let buffer, contentType, extension;
    switch (format) { // crea el archivo según el formato solicitado
        case 'pdf':
            buffer = await generatePDFBuffer(decryptedUser);
            contentType = 'application/pdf';
            extension = 'pdf';
            break;
        case 'csv':
            buffer = Buffer.from(generateCSV(decryptedUser));
            contentType = 'text/csv';
            extension = 'csv';
            break;
        case 'json':
            buffer = Buffer.from(generateJSON(decryptedUser));
            contentType = 'application/json';
            extension = 'json';
            break;
        default:
            throw new Error('Formato no válido');
    }
    return { buffer, contentType, extension }; // se retornan los datos generados
};
