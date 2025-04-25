import mongoose, { mongo } from 'mongoose';

const StockMovementSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    movementType: {
        type: String,
        required: true,
        enum: ['venta', 'ingreso']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const StockMovement = mongoose.model('StockMovement', StockMovementSchema);

export default StockMovement;
