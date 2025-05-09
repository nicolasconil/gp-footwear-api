import User from '../models/user.model.js';

export const getAllUsers = async () => {
    return await User.find();
};

export const getUserById = async (id) => {
    return await User.findById(id);
};

export const getUserByEmailHash = async (emailHash) => {
    return await User.findOne({ emailHash });
};

export const createUser = async (data) => {
    const user = new User(data);
    return await user.save();
};

export const updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

export const findByVerificationToken = async (token) => {
    return await User.findOne({ verificationToken: token });
};

export const findByResetToken = async (token) => {
    return await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });
};