import * as ShippingRepository from '../repositories/shipping.repository.js';
import { encryptGuestInfo, decryptGuestInfo } from '../utils/dataPrivacity.js';

export const createShipping = async (data) => {
    const shippingData = { ...data };
    if (shippingData.guestInfo) {
        shippingData.guestInfo = encryptGuestInfo(shippingData.guestInfo);
    };
    return await ShippingRepository.createShipping(shippingData);
};

export const getAllShippings = async () => {
    const shippings = await ShippingRepository.getAllShippings();
    return shippings.map(shipping => {
        if (shipping.guestInfo) {
            shipping.guestInfo = decryptGuestInfo(shipping.guestInfo);
        }
        return shipping;
    });
};

export const getShippingById = async (id) => {
    const shipping = await ShippingRepository.getShippingById(id);
    if (!shipping) return null;
    if (shipping.guestInfo) {
        shipping.guestInfo = decryptGuestInfo(shipping.guestInfo);
    }
    return shipping;
};

export const updateShipping = async (id, updateData) => {
    const dataToUpdate = { ...updateData };
    if (dataToUpdate.guestInfo) {
        dataToUpdate.guestInfo = encryptGuestInfo(dataToUpdate.guestInfo);
    }
    const updatedShipping = await ShippingRepository.updateShipping(id, dataToUpdate);
    if (updatedShipping?.guestInfo) {
        updatedShipping.guestInfo = decryptGuestInfo(updatedShipping.guestInfo);
    }
    return updatedShipping;
};

export const deleteShipping = async (id) => {
    return await ShippingRepository.deleteShipping(id);
};