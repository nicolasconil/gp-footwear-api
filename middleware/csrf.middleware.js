import csurf from "csurf";

export const csrfProtection = csurf({
    cookie: {
        httpOnly: true, // no accesible para java script
        secure: process.env.NODE_ENV === 'production', // solo por HTTPS en producción
        sameSite: 'Strict' // solo acepta solicitudes del mismo sitio
    }
});

export const addCsrfToken = (req, res, next) => {
    try {
        res.locals.csrfToken = req.csrfToken();
    } catch (error) {
        return res.status(403).json({ message: 'No se pudo generar el token CSRF' });
    }
    next();
};
