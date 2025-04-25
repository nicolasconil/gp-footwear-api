import mongoose from "mongoose";

const variationSchema = new mongoose.Schema({
    size: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    stockMinimo: {
        type: Number,
        default: 1
    }
}, { _id: false });

const ProductSchema =  new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['hombre', 'mujer', 'niños', 'unisex']
    },
    variations: {
        type: [variationSchema],
        required: true
    }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;