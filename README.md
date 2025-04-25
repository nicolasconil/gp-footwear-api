# 🥾 GP Footwear API

API RESTful para gestionar el e-commerce de calzado "GP Footwear". Esta API permite administrar productos, usuarios, autenticación, pedidos, stock, pagos y más. Construida con Node.js, Express y MongoDB.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🚀 Tecnologías

- Node.js
- Express
- MongoDB + mongoose
- Swagger (documentación)
- JWT (autenticación)
- Multer (subida de imágenes)
- Mercado Pago (integración de pagos)
- Nodemailer (notificaciones por correo)
- PDFKit (facturación)
- dotenv (variables de entorno)

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## ⚙️ Instalación

1. Clonar el repositorio:

- git clone https://github.com/nicolasconil/gp-footwear-api.git
- cd gp-footwear-api

2. Instalar dependencias: 

- npm install

3. Crear un archivo .env en la raíz del contenido:

- PORT=3000
- MONGODB_URI=mongodb://localhost:27017/gp-footwear
- JWT_SECRET=tu_clave_secreta
- EMAIL_USER=tu_correo@gmail.com
- EMAIL_PASS=tu_contraseña
- MP_ACCESS_TOKEN=tu_token_de_acceso
- BACKEND_URL=http://localhost:3000
- CLIENT_URL=htpp://localhost:3000/api/webhook
- API_URL=http://localhost:3000/api

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📦 Scripts disponibles

1. Iniciar en modo desarrollador:

- npm run dev

2. Iniciar en producción:

- npm start

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📚 Documentación Swagger

Una vez corriendo el servidor, accedé a:

- http://localhost:3000/api-docs

Ahí podes ver y probar todos los endpoints de la API.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📁 Estructura del proyecto

├── controllers/
├── middleware/
├── models/
├── repositories/
├── routes/
├── services/
├── utils/
├── invoices/
├── uploads/
├── .env
├── app.js
├── README.md

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🧪 Endpoints principales

- /api/products: Productos
- /auth: Autenticación (login/register)
- /user: Gestión de usuarios
- /orders: Pedidos
- /invoices: Acceso a facturas PDF
- /uploads: Imágenes subidas

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📬 Contacto

Desarrollado por Nicolás Conil

- Email de contacto: conilnicolas1@gmail.com

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📄 Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# 🥾 GP Footwear API

RESTful API to manage the e-commerce platform for "GP Footwear". This API allows for managing products, users, authentication, orders, stock, payments, and more. Built with Node.js, Express and MongoDB.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🚀 Technologies

- Node.js
- Express
- MongoDB + mongoose
- Swagger (API documentation)
- JWT (authentication)
- Multer (image upload)
- Mercado Pago (payment integration)
- Nodemailer (email notifications)
- PDFKit (invoice generation)
- dotenv (environment variables)

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## ⚙️ Installation

1. Clone the repository:

- git clone https://github.com/nicolasconil/gp-footwear-api.git
- cd gp-footwear-api

2. Install dependencies:

- npm install

3. Create a .env file in the project root with the following content:

- PORT=3000
- MONGODB_URI=mongodb://localhost:27017/gp-footwear
- JWT_SECRET=your_secret_key
- EMAIL_USER=your_email@gmail.com
- EMAIL_PASS=your_email_password
- MP_ACCESS_TOKEN=your_mercado_pago_token
- BACKEND_URL=http://localhost:3000
- CLIENT_URL=http://localhost:3000/api/webhook
- API_URL=http://localhost:3000/api

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📦 Available Scripts

1. Start in development mode:

- npm run dev

2. Start in production:

- npm start

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📚 Swagger Documentation

Once the server is running, access the docs at: 

- http://localhost:3000/api-docs

You can explore and test all available API endpoints.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📁 Project Structure

├── controllers/
├── middleware/
├── models/
├── repositories/
├── routes/
├── services/
├── utils/
├── invoices/
├── uploads/
├── .env
├── app.js
├── README.md

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🧪 Main Endpoints

- /api/products: Product management 
- /auth: Authentication (login/register)
- /user: User management
- /orders: Orders
- /invoices: Access PDF invoices
- /uploads: Uploaded images

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📬 Contact

Developed by Nicolás Conil

- Contact email: conilnicolas1@gmail.com

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📄 License

This project is licensed under the [MIT License](LICENSE).