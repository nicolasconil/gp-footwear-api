import * as AuthService from '../services/auth.service.js';
import * as UserRepository from '../repositories/user.repository.js';
import { generateToken } from '../middleware/auth.middleware.js';
import { sendVerificationEmail } from '../middleware/email.middleware.js';

export const registerUser = async (req, res) => {
    try {
        const { email, password, name, role = 'cliente' } = req.body;
        const user = await AuthService.registerUser({ email, password, name, role }); // crea el usuario
        const verificationToken = generateToken(user._id, user.role); //
        const verificationUrl = `http://localhost:3000/verify-email/${verificationToken}`; // en esas 3 porciones de código se manda el email de verificación
        await sendVerificationEmail(user.email, verificationUrl); //
        const token = generateToken(user._id, user.role); // se genera el token de sesión (para cookie)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000,
            path: '/'
        });
        res.status(201).json({ message: 'Usuario registrado, verifica tu correo' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const authenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await AuthService.authenticateUser(email, password); // verifica si existe el usuario y si la contraseña es correcta
        const token = generateToken(user._id, user.role); // genera el token
        res.cookie('token', token, { // guarda el token en una cookie segura
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000,
            path: '/'
        });
        res.status(200).json({ message: 'Autenticación exitosa' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token', { // elimina el token guardado en la cookie   
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            path: '/'
        });
        res.status(200).json({ message: 'Sesión cerrada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al cerrar sesión', error });
    }
}

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
