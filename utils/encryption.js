import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ADDRESS_ENCRYPTION_KEY;
const IV_LENGTH = 16; // AES usa IV de 16 bytes

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
    throw new Error('ADDRESS_ENCRYPTION_KEY debe estar definida y tener 32 caracteres.');
};

// encripta texto genérico (address, phone.number, fullName, email, etc.)

export const encryptText = (text) => {
    if (!text) return '';
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text, 'utf8');
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decryptText = (text) => {
    if (!text) return '';
    const [ivHex, encryptedData] = text.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = Buffer.from(encryptedData, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};