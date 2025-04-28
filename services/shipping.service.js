import { getShippingRate } from "./carriers/andreani.service.js";

export const calculateShippingCost = async (destination) => {
    return await getShippingRate(destination.postalCode);
};