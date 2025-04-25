import * as UserRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';

export const getAll = async () => {
    return await UserRepository.getAllUsers();
};

export const getById = async (id) => {
    const user = await UserRepository.getUserById(id);
    
    if (!user) throw new Error('Usuario no encontrado');
    
    return user;
};
export const getByEmail = async (email) => {
    return await UserRepository.getUserByEmail(email);
};

export const update = async (id, data) => {
    return await UserRepository.updateUser(id, data);
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

