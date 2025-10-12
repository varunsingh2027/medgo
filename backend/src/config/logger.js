import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create logs directory if it doesn't exist
const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Format timestamp
const getTimestamp = () => {
  const now = new Date();
  return now.toISOString();
};

// Simple file logger
const writeToFile = (level, message) => {
  try {
    const timestamp = getTimestamp();
    const logEntry = `${timestamp} [${level.toUpperCase()}]: ${message}\n`;
    
    // Write to combined log
    fs.appendFileSync(
      path.join(logDir, 'combined.log'),
      logEntry
    );
    
    // Write errors to error log
    if (level === 'error') {
      fs.appendFileSync(
        path.join(logDir, 'error.log'),
        logEntry
      );
    }
  } catch (err) {
    console.error('Error writing to log file:', err);
  }
};

// Simple logger implementation
const logger = {
  info: (message) => {
    console.log(`\x1b[36m[INFO]\x1b[0m: ${message}`);
    writeToFile('info', message);
  },
  
  debug: (message) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`\x1b[32m[DEBUG]\x1b[0m: ${message}`);
      writeToFile('debug', message);
    }
  },
  
  warn: (message) => {
    console.log(`\x1b[33m[WARN]\x1b[0m: ${message}`);
    writeToFile('warn', message);
  },
  
  error: (message, error) => {
    const errorMsg = error ? `${message}: ${error.message}\n${error.stack}` : message;
    console.error(`\x1b[31m[ERROR]\x1b[0m: ${errorMsg}`);
    writeToFile('error', errorMsg);
  },
  
  // For Morgan integration
  stream: {
    write: (message) => {
      logger.info(message.trim());
    }
  }
};

export default logger;