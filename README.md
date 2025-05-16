# 🥾 GP Footwear API

API RESTful para gestionar el e-commerce de calzado "GP Footwear". Esta API permite administrar productos, usuarios, autenticación, pedidos, stock, pagos y más. Construida con Node.js, Express y MongoDB.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🚀 Tecnologías

- Node.js + Express (framework backend)
- MongoDB + mongoose (base de datos NoSQL)
- Swagger (documentación de la API)
- JWT (autenticación segura)
- Multer (subida de imágenes)
- Mercado Pago (integración de pagos)
- Nodemailer (notificaciones por correo)
- PDFKit (generación de facturas en PDF)
- dotenv (variables de entorno)
- bcrypt (hashing de contraseñas)
- crypto (cifrado AES de datos personales) 

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🔒 Seguridad y cumplimiento

- Protección CSRF (`csurf`)
- Protección contra XSS (`xss-clean`)
- Limpieza de datos maliciosos (`express-mongo-sanitize`)
- Límite de peticiones (`express-rate-limit`)
- Seguridad de headers HTTP (`helmet`)
- Cookies seguras (`cookie-parser`)
- Cifrado de datos sensibles en reposo (nombre, dirección, email, etc.)
- Exportación de datos personales en PDF, CSV y JSON
- Gestión de consentimiento y privacidad (GDPR-ready)
- Logs de auditoria (`winston`)
- Sistema de backups
- Protección contra fuerza bruta como bloqueo temporal
- Headers HTTP configurados (deshabilita `X-Powered-By`, define `Content-Security-Policy`)

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

├── controllers/            # Lógica de los endpoints
├── middleware/             # Autenticación, validaciones, protección
├── models/                 # Esquemas de Mongoose
├── repositories/           # Abstracción de acceso de datos
├── routes/                 # Rutas express agrupadas
├── services/               # Lógica de negocio
├── utils/                  # Utilidades (cifrado, validaciones, envío de correos, etc.)
├── invoices/               # Facturas generadas en PDF
├── uploads/                # Imágenes subidas por Multer
├── .env                    # Punto de entrada principal
├── app.js                  # Variables de entorno
├── README.md

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🧪 Endpoints principales

- /products: Gestión de productos (CRUD, stock, variaciones por talle/color, imagen)
- /auth: Autenticación y autorización (JWT, recuperación de contraseña, verificación por email)
- /user: Gestión de usuarios (registro, login, perfil, verificación, roles)
- /orders: Gestión de pedidos (seguimiento, actualización de estado, historial)
- /invoices: Generación y descarga de facturas PDF
- /uploads: Subidas de imágenes para productos
- /payments: Pago con Mercado Pago, RapiPago, PagoFácil, transferencias bancarias 
- /newsletter: Suscripción a newsletter y envío de correos automáticos (EmailJS o Nodemail)
- /data: Exportación de datos personales (PDF, CSV, JSON)

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

- Node.js + Express (backend framework)
- MongoDB + mongoose (NoSQL database)
- Swagger (API documentation)
- JWT (authentication)
- Multer (image upload)
- Mercado Pago (payment integration)
- Nodemailer (email notifications)
- PDFKit (invoice generation)
- dotenv (environment variables)
- bcrypt (password hashing)
- crypto (AES encryption for personal data)

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🔒 Security and Compliance

- CSRF protection (`csurf`)
- XSS protection (`xss-clean`)
- Malicious data cleaning (`express-mongo-sanitize`)
- Request limiting (`express-rate-limit`)
- HTTP Header Security (`helmet`)
- Secure cookies (`cookie-parser`)
- Sensitive data encryption at Rest (name, address, email, etc.)
- Personal data export in PDF, CSV and JSON formats
- Consent and privacy management (GDPR-ready)
- Audit logs (`winston`)
- Backup system
- Brute force protection (temporary lockout)
- HTTP Headers configured (disables `X-Powered-By`, defines `Content-Security-Policy`)

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

├── controllers/            # Endpoint logic        
├── middleware/             # Authentication, validations, protection
├── models/                 # Mongoose schemas
├── repositories/           # Data access abstraction
├── routes/                 # Grouped express routes
├── services/               # Business logic
├── utils/                  # Utilities (encryption, validations, email, sending, etc.)
├── invoices/               # Generated PDF invoices
├── uploads/                # Uploaded images via Multer
├── .env                    # Main environment file 
├── app.js                  # Environment variables
├── README.md

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🧪 Main Endpoints

- /products: Product management (CRUD, stock, size/color variations, images) 
- /auth: Authentication and authorization (JWT, password recovery, email verification)
- /user: User management (registration, login, profile, verification, roles)
- /orders: Orders management (tracking, status updates, history)
- /invoices: Generate and download PDF invoices
- /uploads: Product images uploads
- /payments: Payments via Mercado Pago, RapiPago, PagoFácil, bank transfers
- /newsletter: Newsletter subscription and email notification (EmailJS or Nodemailer)
- /data: Export personal data (PDF, CSV, JSON)

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📬 Contact

Developed by Nicolás Conil

- Contact email: conilnicolas1@gmail.com

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📄 License

This project is licensed under the [MIT License](LICENSE).