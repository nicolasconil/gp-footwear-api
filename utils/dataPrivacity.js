import { decryptText, encryptText } from "./encryption.js";

export const encryptAddress = (address = {}) => { // encripta dirección
    const encrypted = {};
    for (const key of Object.keys(address)) {
        encrypted[key] = address[key] ? encryptText(address[key]) : address[key];
    }
    return encrypted;
};

export const encryptPhone = (phone = {}) => { // encripta núm de tel.
    return {
        ...phone,
        number: phone.number ? encryptText(phone.number) : phone.number
    };
};

export const encryptUserFields = (user) => { // encripta el usuario (email, nombre, teléfono y dirección)
    if (!user) return null;
    return {
        ...user,
        email: user.email ? encryptText(user.email) : user.email,
        fullName: user.fullName ? encryptText(user.fullName) : user.fullName,
        phone: encryptPhone(user.phone),
        address: encryptAddress(user.address)
    };
};

export const decryptAddress = (address = {}) => { // desencripta dirección
    const decrypted = {};
    for (const key of Object.keys(address)) {
        decrypted[key] = address[key] ? decryptText(address[key]) : address[key];
    };
    return decrypted;
};

export const decryptPhone = (phone = {}) => { // desencripta núm. de tel.
    return {
        ...phone,
        number: phone.number ? decryptText(phone.number) : phone.number
    };
};

export const decryptUserFields = (user) => { // desencripta el usuario (email, nombre, teléfono y dirección)
    if (!user) return null;
    const plainUser = typeof user.toObject === 'function' ? user.toObject() : { ...user };
    return {
        ...plainUser,
        email: plainUser.email ? decryptText(plainUser.email) : plainUser.email,
        fullName: plainUser.fullName ? decryptText(plainUser.fullName) : plainUser.fullName,
        phone: decryptPhone(plainUser.phone),
        address: decryptAddress(plainUser.address)
    };
};

export const encryptGuestInfo = (guest = {}) => {
    return {
        fullName: guest.fullName ? encryptText(guest.fullName) : guest.fullName,
        email: guest.email ? encryptText(guest.email) : guest.email,
        phone: encryptPhone(guest.phone),
        address: encryptAddress(guest.address)
    };
};

export const decryptGuestInfo = (guest = {}) => {
    return {
        fullName: guest.fullName ? decryptText(guest.fullName) : guest.fullName,
        email: guest.email ? decryptText(guest.email) : guest.email,
        phone: decryptPhone(guest.phone),
        address: decryptAddress(guest.address)
    };
};