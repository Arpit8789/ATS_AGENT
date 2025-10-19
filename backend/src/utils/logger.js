const fs = require('fs');
const path = require('path');

class Logger {
    constructor(filename = 'server.log') {
        this.logPath = path.join(__dirname, '..', '..', filename);
    }

    log(level, message, meta = {}) {
        const timeStamped = `[${new Date().toISOString()}] [${level}] ${message} ${JSON.stringify(meta)}\n`;
        fs.appendFileSync(this.logPath, timeStamped);
    }

    info(msg, meta) { this.log('INFO', msg, meta); }
    error(msg, meta) { this.log('ERROR', msg, meta); }
}

module.exports = new Logger();
