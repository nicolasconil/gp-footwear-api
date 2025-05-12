import Shipping from "../models/shipping.model.js";
import { encryptUserFields, decryptUserFields, encryptGuestInfo, decryptGuestInfo } from "../utils/dataPrivacity.js";

export const createShipping = async (data) => {
    if (data.guestInfo) {
        data.guestInfo = encryptGuestInfo(data.guestInfo);
    }
    const newShipping = await Shipping.create(data);
    const shipping = await Shipping.findById(newShipping._id).populate('order');
    const plainShipping = shipping.toObject(); // desencriptar guestInfo si existe
    if (plainShipping.guestInfo) {
        plainShipping.guestInfo = decryptGuestInfo(plainShipping.guestInfo);
    }
    return plainShipping;
};

export const getAllShippings = async () => {
    const shippings = await Shipping.find().populate('order');
    return shippings.map(s => {
        const shipping = s.toObject();
        if (shipping.guestInfo) {
            shipping.guestInfo = decryptGuestInfo(shipping.guestInfo);
        }
        return shipping;
    });
};

export const getShippingById = async (id) => {
    const shipping = await Shipping.findById(id).populate('order');
    if (!shipping) return null;
    const plainShipping = shipping.toObject();
    if (plainShipping.guestInfo) {
        plainShipping.guestInfo = decryptGuestInfo(plainShipping.guestInfo);
    }
    return plainShipping;
};

export const updateShipping = async (id, updateData) => {
    if (updateData.guestInfo) {
        updateData.guestInfo = encryptGuestInfo(updateData.guestInfo);
    }
    const updatedShipping = await Shipping.findByIdAndUpdate(id, updateData, { new: true }).populate('order');
    if (!updatedShipping) return null;
    const plainShipping = updatedShipping.toObject();
    if (plainShipping.guestInfo) {
        plainShipping.guestInfo = decryptGuestInfo(plainShipping.guestInfo);
    }
    return plainShipping;
};

export const updateShippingStatus = async (id, status) => {
    return await Shipping.findByIdAndUpdate(id, { status }, { new: true }).populate('order');
};

export const deleteShipping = async (id) => {
    return await Shipping.findByIdAndDelete(id);
};

export const getShippingOrderById = async (orderId) => {
    const shipping = await Shipping.findOne({ order: orderId }).populate('order');
    if (!shipping) return null;
    const plainShipping = shipping.toObject();
    if (plainShipping.guestInfo) {
        plainShipping.guestInfo = decryptGuestInfo(plainShipping.guestInfo);
    }
    return plainShipping;
};