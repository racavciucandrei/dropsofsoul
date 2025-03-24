
/**
 * Enhanced logging utility for debugging
 */

type LogLevel = 'debug' | 'info' | 'warning' | 'error';

// Enable specific log levels (customize based on environment)
const enabledLevels: Record<LogLevel, boolean> = {
  debug: true,
  info: true,
  warning: true,
  error: true
};

// Function to create a styled console output
const createLogger = (level: LogLevel, prefix: string) => {
  return (...args: any[]) => {
    if (!enabledLevels[level]) return;
    
    const styles = {
      debug: 'color: #9b87f5; font-weight: bold;',
      info: 'color: #0ea5e9; font-weight: bold;',
      warning: 'color: #f97316; font-weight: bold;',
      error: 'color: #ef4444; font-weight: bold; font-size: 1.1em;'
    };
    
    const timestamp = new Date().toISOString();
    console[level === 'debug' ? 'log' : level === 'warning' ? 'warn' : level](
      `%c[${timestamp}][${prefix}]`, 
      styles[level], 
      ...args
    );
  };
};

// Create loggers for different modules
export const createModuleLogger = (moduleName: string) => {
  return {
    debug: createLogger('debug', `${moduleName}`),
    info: createLogger('info', `${moduleName}`),
    warning: createLogger('warning', `${moduleName}`),
    error: createLogger('error', `${moduleName}`)
  };
};

// Image loading logger
export const imageLogger = createModuleLogger('Image');

// API logger
export const apiLogger = createModuleLogger('API');

// Default generic logger
export const logger = {
  debug: createLogger('debug', 'App'),
  info: createLogger('info', 'App'),
  warning: createLogger('warning', 'App'),
  error: createLogger('error', 'App')
};

export default logger;
