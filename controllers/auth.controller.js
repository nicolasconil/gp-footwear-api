import * as AuthService from '../services/auth.service.js';
import * as UserRepository from '../repositories/user.repository.js';
import { generateToken } from '../middleware/auth.middleware.js';
import { sendVerificationEmail } from '../middleware/email.middleware.js';

export const registerUser = async (req, res) => {
    try {
        const { email, password, name, role = 'cliente' } = req.body;
        const user = await AuthService.registerUser({ email, password, name, role });
        const verificationToken = generateToken(user._id, user.role);
        const verificationUrl = `http://localhost:3000/verify-email/${verificationToken}`;
        await sendVerificationEmail(user.email, verificationUrl);
        res.status(201).json({ message: 'Usuario registrado, verifica tu correo' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const authenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await AuthService.authenticateUser(email, password);
        const token = generateToken(user._id, user.role);
        res.status(200).json({ message: 'Autenticación exitosa', token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        await AuthService.verifyUserEmail(token);
        res.status(200).json({ message: 'Correo verificado exitosamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserRepository.getUserByEmail(email);
        const resetToken = generateToken(user._id);
        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        await sendVerificationEmail(user.email, resetUrl);
        res.status(200).json({ message: 'Correo de recuperación enviado' });
    } catch (error) {
        res.status(400).json({ messsage: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        await AuthService.resetUserPassword(token, newPassword);
        res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
