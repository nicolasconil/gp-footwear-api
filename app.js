import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import productRoute from './routes/product.route.js';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import orderRoute from './routes/order.route.js';
import stockMovementRoute from './routes/stockMovement.route.js';
import shippingRoute from './routes/shipping.route.js';
import reviewRoute from './routes/review.route.js';
import paymentRoute from './routes/payment.route.js';
import newsletterRoute from './routes/newsletter.route.js';
import dataRoute from './routes/data.route.js';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import { csrfProtection, addCsrfToken } from './middleware/csrf.middleware.js';
import cookieParser from 'cookie-parser';
import { requestLogger } from './middleware/requestLogger.middleware.js';
import { limiter } from './middleware/ratelimit.middleware.js';


const app = express();
const mongodb = process.env.MONGODB_URI;

// configuración básica segura
app.set('trust proxy', 1); // para que funcione bien detrás de proxies como Heroku, Nginx
app.disable('x-powered-by');

// middleware de seguridad
app.use(helmet()); // protege cabeceras HTTP
app.use(ExpressMongoSanitize()); // previene inyecciones NoSQL
app.use(xss()); // limpia entradas contra XSS
app.use(compression()); // comprime respuestas HTTP
app.use(csrfProtection); // protección CSRF
app.use(addCsrfToken); // middleware que agrega el token CSRF en las respuestas
app.use(cookieParser());
app.use(requestLogger);

// logger HTTP
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
};

app.use('/api', limiter); 

// lectura segura de JSON y formularios
app.use(express.json({ limit: '10kb' })); // límite para evitar grandes payloads maliciosos
app.use(express.urlencoded({ extended: true }));

// forzar HTTPS solo en producción
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
            return next();
        }
        res.redirect('https://' + req.header.host + req.url);
    });
}

const allowedOrigins = [process.env.FRONTEND_URL];;

app.use(cors({ // CORS habilitado (ajustar orígenes en prod si es necesario)
    origin: function (origin, callback) {
        if (!origin) return callback (null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'))
    },
    credentials: true
})); 
app.use('/invoices', express.static(path.join(process.cwd(), 'invoices')));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

mongoose.connect(mongodb)
.then(() => console.log('MongoDB connected to GP Footwear'))
.catch(error => console.error('Connection error', error));

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'GP Footwear API',
            version: '1.0.0',
            description: 'API para el e-commerce de zapatillas',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html"'
            },
            contact: {
                name: 'Nicolás Conil',
                email: 'conilnicolas1@gmail.com'
            },
        },
        servers: [
            {
                url: process.env.API_URL || 'http://localhost:3000/api',
            },
        ],
    },
    apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/products', productRoute);
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/orders', orderRoute);
app.use('/api/stock-movement', stockMovementRoute);
app.use('/api/shipping', shippingRoute);
app.use('/api/review', reviewRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/newsletter', newsletterRoute);
app.use('/api/data', dataRoute);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({
        message: 'Error interno del servidor',
        error: error.message
    });
});

export default app;