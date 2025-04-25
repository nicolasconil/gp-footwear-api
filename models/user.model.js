import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Email inválido']
    },
    password: {
        type: String,
        minlength: 6
    },
    isEmailVerified: {
        type: Boolean, 
        default: false
    },
    role: {
        type: String,
        enum: ['cliente', 'admin'],
        default: 'cliente'
    },
    address: {
        street: { type: String, default: '' },
        number: { type: String, default: '' },
        floor: { type: String, default: '' },
        apartment: { type: String, default: '' },
        city: { type: String, default: '' },
        province: { type: String, default: '' },
        postalCode: { type: String, default: '' },
        country: { type: String, default: 'Argentina' }
    },
    phone: {
        countryCode: {
            type: String,
            default: '+54',
            match: [/^\+\d{1,4}$/, 'Código de país inválido']
        },
        number: {
            type: String,
            default: '',
            match: [/^\d{6,15}$/, 'Número de teléfono inválido']
        }
    },
    productPreferences: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    verificationToken: String,
    verificationExpires: {
        type: Date
    },
    resetPasswordToken: String,
    resetPasswordExpires: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error) {
        return next(error);
    }
});

const User = mongoose.model('User', UserSchema);
export default User;