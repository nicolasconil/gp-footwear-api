import csurf from "csurf";

const csrfProtection = csurf({
    cookie: {
        httpOnly: true, // no accesible para java script
        secure: process.env.NODE_ENV === 'production', // solo por HTTPS en producción
        sameSite: 'Strict' // solo acepta solicitudes del mismo sitio
    }
});

const addCsrfToken = (req, res, next) => {
    try {
        res.locals.csrfToken = req.csrfToken();
    } catch (error) {
        return res.status(403).json({ message: 'No se pudo generar el token CSRF' });
    }
    next();
}
export default { csrfProtection, addCsrfToken };