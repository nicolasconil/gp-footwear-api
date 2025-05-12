import mongoose from 'mongoose';
import { encryptUserFields, decryptUserFields } from '../utils/dataPrivacity.js';

const ShippingSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
        unique: true
    },
    shippingCost: {
        type: Number,
        required: true
    },
    shippingCarrier: {
        type: String,
        enum: ['Andreani', 'Correo Argentino', 'OCA', 'Retiro en tienda', 'Otro'],
        default: 'Otro'
    },
    shippingMethod: {
        type: String,
        enum: ['Estándar', 'Express', 'Retiro en tienda'],
        default: 'Estándar'
    },
    shippingTrackingNumber: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pendiente', 'preparando', 'en camino', 'entregado', 'rechazado', 'devuelto'],
        default: 'pendiente'
    },
    destinationPostalCode: {
        type: String,
        required: true
    },
    deliveryAddress: {
        fullName: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        apartment: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
        }
    },
    guestInfo: {
        email: String,
        fullName: String,
        phone: {
            number: String
        },
        address: {
            street: String,
            number: String,
            apartment: String,
            city: String,
            province: String,
            postalCode: String
        }
    },
    estimatedDeliveryDate: {
        type: Date,
    },
    deliveredAt: {
        type: Date
    },
    notes: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

ShippingSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Shipping = mongoose.model('Shipping', ShippingSchema);
export default Shipping;