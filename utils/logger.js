import winston from 'winston';
import path from 'path';

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.File({
            filename: path.join('logs', 'error.log'),
            level: 'error',
        }),
        new winston.transports.File({
            filename: path.join('logs', 'combined.log'),
        }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
};

export default logger;