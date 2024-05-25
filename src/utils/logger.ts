import pino from 'pino';//high-performance logging library for Node.js applications

export const logger = pino ({
    // Redact sensitive information
    redact : ["DATABASE_CONNECTION"],
    //all log messages with a level of debug or higher (debug, info, warn, error, fatal) will be logged.
    level : 'debug',
    //formats the logs in a more readable way
    transport : {
        target : "pino-pretty",
        options : {
            colorize : true,//colorize the log
            translateTime : true //Translate timestamps to human-readable format
        }
    }
})