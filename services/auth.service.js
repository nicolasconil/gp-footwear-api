import * as UserRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../middleware/auth.middleware.js';

export const authenticateUser = async (email, password) => {
    const user = await UserRepository.getUserByEmail(email);
    if (!user) throw new Error('Usuario no encontrado');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Contraseña incorrecta');
    if (!user.isEmailVerified) throw new Error('Debes verificar tu correo');
    return generateToken(user._id, user.role);
};

export const registerUser = async ({ email, password, name }) => {
    const exists = await UserRepository.getUserByEmail(email);
    
    if (exists) throw new Error('El correo ya está registrado');
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await UserRepository.createUser({
        email,
        password: hashedPassword,
        name,
        role,
        isEmailVerified
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