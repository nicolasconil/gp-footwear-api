import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import productRoute from './routes/product.route.js';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import orderRoute from './routes/order.route.js';
import stockMovementRoute from './routes/stockMovement.route.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongodb = process.env.MONGODB_URI;

app.use(bodyParser.json());
app.use(cors());
app.use('/invoices', express.static(path.join(process.cwd(), 'invoices')));
app.use('/uploads', express.static(path.resolve('uploads')));

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

app.use('/api', productRoute);
app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/orders', orderRoute);
app.use('/', stockMovementRoute);

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

app.listen(port, () => {
    console.log(`Server is running in port ${port}.`);
});