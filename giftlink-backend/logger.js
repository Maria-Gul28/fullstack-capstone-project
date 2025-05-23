// logger.js (ES Module version)
import pino from 'pino';

let logger;

if (process.env.NODE_ENV !== 'production') {
    logger = pino({
        level: 'debug',
        transport: {
            target: 'pino-pretty',
        },
    });
} else {
    logger = pino();
}

export default logger;
