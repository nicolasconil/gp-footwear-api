import * as UserService from '../services/user.service.js';
import * as AuthService from '../services/auth.service.js';

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