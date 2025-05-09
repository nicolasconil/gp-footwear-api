import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    isGuest: {
        type: Boolean,
        default: false // <- 'true' si es un usuario anónimo
    },
    fullName: {
        type: String, // encriptado con AES manualmente en el auth.service.js
        trim: true,
        minlength: 3,
        required: false // <- no obligatorio para compras como invitado
    },
    email: {
        type: String, // encriptado con AES 
        unique: false, // puede haber múltiples invitados sin email
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Email inválido'],
        required: false
    },
    emailHash: {
        type: String, // SHA-256 para búsquedas
        required: false // sólo se usa si hay un email
    },
    password: {
        type: String,
        minlength: 6,
        required: false // validado condicionalmente
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
    address: { // encriptado
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
        number: { // encriptado
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
    verificationExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    termsAccepted: {
        type: Boolean,
        required: false, // sólo es obligatorio si es un usuario registrado.
        default: false
    },
    termsAcceptedAt: {
        type: Date,
        required: false
    },
    consent: {
        cookies: {
            type: Boolean,
            default: false
        },
        newsletter: {
            type: Boolean,
            default: false
        },
        acceptedAt: {
            type: Date
        }
    }
});

UserSchema.pre('validate', function (next) {
    if(!this.isGuest) {
        if (!this.email) return next(new Error('El email es requerido para usuarios registrados.'));
        if (!this.password) return next(new Error('La contraseña es requerida  para usuarios registrados.'));
        if (!this.termsAccepted) return next(new Error('Debes acordar los términos y condiciones.'));
    } else {
        const hasPersonalData = // invitado con datos sensibles
            this.fullName || this.email || this.phone?.number || this.address?.street;
        if (hasPersonalData && !this.termsAccepted) {
            return next(new Error('Debes aceptar la política de privacidad para continuar como invitado.'));
        }
    }
    next();
});

UserSchema.pre('save', function (next) {
    if (this.isModified('termsAccepted') && this.termsAccepted && !this.termsAcceptedAt) {
        this.termsAcceptedAt = new Date();
    }
    next();
});

const User = mongoose.model('User', UserSchema);
export default User;