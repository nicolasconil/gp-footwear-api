import * as UserRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
import { encryptUserFields, decryptUserFields } from '../utils/dataPrivacity.js';
import crypto from 'crypto';

export const getAll = async () => {
    const users = await UserRepository.getAllUsers();
    return users.map(decryptUserFields);
};

export const getById = async (id) => {
    const user = await UserRepository.getUserById(id);
    if (!user) throw new Error('Usuario no encontrado');
    return decryptUserFields(user);
};

export const getByEmail = async (email) => {
    const emailHash = crypto.createHash('sha256').update(email).digest('hex');
    return await UserRepository.getUserByEmailHash(emailHash);
};

export const update = async (id, data) => {
    const encryptedData = encryptUserFields(data)
    return await UserRepository.updateUser(id, encryptedData);
};

export const remove = async (id) => {
    return await UserRepository.deleteUser(id);
};

export const setVerificationToken = async (userId, token, expires) => {
    return await UserRepository.updateUser(userId, { verificationToken: token, verificationExpires: expires })
};

export const setPasswordResetToken = async (userId, token, expires) => {
    return await UserRepository.updateUser(userId, { resetPasswordToken: token, resetPasswordExpires: expires });
};

export const verifyUserEmail = async (token) => {
    const user = await UserRepository.findByVerificationToken(token);
    if (!user) throw new Error('Token de verificación inválido o expirado');
    if (new Date() > user.verificationExpires) {
        throw new Error('El token de verificación ha expirado');
    }
    return await UserRepository.updateUser(user._id, {
        isEmailVerified: true,
        verificationToken: null,
        verificationExpires: null
    });
};

export const resetUserPassword = async (token, newPassword) => {
    const user = await UserRepository.findByResetToken(token);
    
    if (!user) throw new Error('Token de recuperación inválido o expirado');
    
    const salt = await bcrypt.genSalt(10);
    
    const hash = await bcrypt.hash(newPassword, salt);
    
    return await UserRepository.updateUser(user._id, {
        password: hash,
        resetPasswordToken: null,
        resetPasswordExpires: null
    });
};

export const updateConsent = async (userId, consentData) => {
    const user = await UserRepository.getUserById(userId);
    if (!user) throw new Error('Usuario no encontrado');
    user.consent = { // actualiza los campos que vienen en consentData (ej: cookies, newsletter, etc.)
        ...user.consent,
        ...consentData,
        acceptedAt: new Date()
    };
    await user.save();
    return user;
}