import * as UserService from '../services/user.service.js';
import * as AuthService from '../services/auth.service.js';
import { exportUserDataFile } from '../utils/exportUserData.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserService.getAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserService.getById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const newUser = await AuthService.registerUser(req.body);
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updateUser = await UserService.update(id, data);
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await UserService.remove(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        await UserService.remove(req.user.id);
        res.clearCookie('token');
        res.status(200).json({ message: 'Cuenta eliminada con éxito.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar cuenta', error });
    }
};

export const exportUserData = async (req, res) => {
    try {
        const userId = req.user.id;
        const format = req.query.format || 'json';
        const { buffer, contentType, extension } = await exportUserDataFile(userId, format);
        res.setHeader('Content-Disposition', `attachment; filename=datos_usuario.${extension}`);
        res.setHeader('Content-Type', contentType);
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ message: 'Error al exportar los datos', error: error.message });
    }
};

export const updateUserConsent = async (req, res) => {
    try {
        const userId = req.user.id;
        const consentData = req.body;
        const updateUser = await UserService.updateConsent(userId, consentData);
        res.status(200).json({ message: 'Consentimiento actualizado', user: updateUser });       
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};