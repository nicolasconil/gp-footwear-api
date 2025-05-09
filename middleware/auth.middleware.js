import jwt from 'jsonwebtoken';
const secretKey = process.env.SECRET_KEY;

export const generateToken = (userId, role) => {
    return jwt.sign({ id: userId, role: role }, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (req, res, next) => {
    const token = req.cookies?.token || req.header('Authorization')?.split(' ')[1]; // busca primero en cookies y después en 'Authorization' de header
    if (!token) {
        res.status(403).json({ message: 'Acceso denegado' });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

export const verifyAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        res.status(403).json({ message: 'Acceso denegado: necesitar ser administrador' });
    }
    next();
};