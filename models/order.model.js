import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    products: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        size: String,
        color: String,
        price: Number
    }],
    shippingAddress: {
        street: String,
        number: String,
        floor: String,
        apartment: String,
        city: String,
        province: String,
        postalCode: String,
        country: { type: String, default: 'Argentina' }
    },
    status: {
        type: String,
        enum: ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'],
        default: 'pendiente'
    },
    totalAmount: Number,
    payment: {
        paymentId: String,
        payment_type: String,
        transaction_amount: Number,
        status: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;