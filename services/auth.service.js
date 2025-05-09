import * as UserRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
import { encryptText } from '../utils/encryption.js';
import { generateToken } from '../middleware/auth.middleware.js';
import crypto from 'crypto';

export const authenticateUser = async (email, password) => {
    const emailHash = crypto.createHash('sha256').update(email).digest('hex');
    const user = await UserRepository.getUserByEmail(emailHash);
    if (!user) throw new Error('Usuario no encontrado');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Contraseña incorrecta');
    if (!user.isEmailVerified) throw new Error('Debes verificar tu correo');
    return generateToken(user._id, user.role);
};

export const registerUser = async ({ email, password, name, role = 'cliente', termsAccepted, address = {}, phone = {} }) => {
    if (!termsAccepted) {
        throw new Error('Debes aceptar los términos y condiciones para registrarte')
    }
    const emailHash = crypto.createHash('sha256').update(email).digest('hex'); // hash irreversible para buscar por email
    const exists = await UserRepository.getUserByEmailHash(emailHash);
    if (exists) throw new Error('El correo ya está registrado');
    const hashedPassword = await bcrypt.hash(password, 10);
    const encryptedEmail = encryptText(email); // encripta email
    const encryptedName = encryptText(name); // encripta nombre
    const encryptedAddress = {}; // encripta la dirección si se envía
    for (const key in address) {
        encryptedAddress[key] = encryptText(address[key]);
    }; 
    const encryptedPhone = { // encripta el número de teléfono
        ...phone,
        number: phone.number ? encryptText(phone.number) : ''
    };
    const newUser = await UserRepository.createUser({
        email: encryptedEmail,
        emailHash,
        password: hashedPassword,
        fullName: encryptedName,
        role,
        address: encryptedAddress,
        phone: encryptedPhone,
        isEmailVerified: false,
        termsAccepted: true,
        termsAcceptedAt: new Date()
    });
    
    return newUser;
};

export const verifyUserEmail = async (token) => {
    const user = await UserRepository.findByVerificationToken(token);
    if (!user) throw new Error('Token inválido');   
    user.isEmailVerified = true;   
    user.verificationToken = undefined;  
    await user.save();
};

export const resetUserPassword = async (token, newPassword) => {
    const user = await UserRepository.findByResetToken(token);
    if (!user) throw new Error('Token inválido o expirado');
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;   
    user.resetPasswordExpires = undefined;  
    await user.save();
};

export const createGuestUser = async ({ address = {}, phone = {} }) => {
    const randomPassword = crypto.randomBytes(16).toString('hex');
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    const encryptedAddress = {};
    for (const key in address) {
        encryptedAddress[key] = encryptText(address[key]);
    };
    const encryptedPhone = {
        ...phone,
        number: phone.number ? encryptText(phone.number) : ''
    };
    const newGuest = await UserRepository.createUser({
        isGuest: true,
        password: hashedPassword,
        address: encryptedAddress,
        phone: encryptedPhone
    });
    return newGuest;
};