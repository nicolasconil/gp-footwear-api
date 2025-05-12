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
    shipping: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipping',
        required: false
    },
    status: {
        type: String,
        enum: ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'],
        default: 'pendiente'
    },
    totalAmount: {
        type: Number,
        required: true
    },
    payment: {
        type: Object,
        required: true
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

OrderSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;