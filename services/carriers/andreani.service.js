import axios from 'axios';

const API_URL = 'https://apis.andreani.com/v1';
const USERNAME = process.env.ANDREANI_USER;
const PASSWORD = process.env.ANDREANI_PASSWORD;
const CLIENT_ID = process.env.ANDREANI_CLIENT_ID;

const getAuthToken = async () => {
    const { data } = await axios.post(`${API_URL}/login`, {
        username: USERNAME,
        password: PASSWORD
    });
    return data.token; 
};

export const getShippingRate = async (destinationPostalCode) => {
    const token = await getAuthToken();
    const requestBody = {
        originPostalCode: '3000', // código postal de Santa Fe (Capital)
        destinoPostalCode: destinationPostalCode,
        contractId: CLIENT_ID,
        packages: [{
            weight: 1,
            volume: 1
        }]
    };
    const { data }  = await axios.post(`${API_URL}/tarifas`, requestBody, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    return data.totalPrice;
};