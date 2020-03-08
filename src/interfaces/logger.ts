const { createLogger, format, transports, splat, combine, timestamp, printf } = require('winston');
const path = require('path');
const level = process.env.LOG_LEVEL || 'debug';

const logger = (caller: string) => {
    return createLogger({
        level: level,
        format: format.combine(
            format.label({ label: path.basename(caller) }),
            format.colorize(), 
            format.simple(),
            format.timestamp({
                format: "YYYY-MM-DD HH:mm:ss"
            }),
            format.printf((info: any) => `${info.timestamp} ${info.level} [${info.label}]: ${JSON.stringify(info.message)}`)
        ),
        transports: [new transports.Console()]
    });
}

module.exports = logger