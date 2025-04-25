import Product from '../models/product.model.js';

export const getAllProducts = async (name) => {
    return await Product.find({
        name: { $regex: `.*${name}.*`, $options: 'i' }
    });
};

export const getProduct = async (id) => {
    return await Product.findById(id);
};

export const createProduct = async (data) => {
    const product = new Product(data);
    return await product.save();
};

export const updateProduct = async (id, data) => {
    return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

export const updateProductStock = async (productId, size, color, newStock) => {
    return await Product.findOneAndUpdate({
        _id: productId,
        "variations.size": size,
        "variations.color": color
    },
        {
            $set: {
                "variations.$.stock": newStock
            }
        },
        {
            new: true
        }
    );
};