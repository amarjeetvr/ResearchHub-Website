import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';

// Simple MongoDB injection sanitizer
const mongoSanitize = () => {
  return (req, res, next) => {
    const sanitize = (obj) => {
      if (obj && typeof obj === 'object') {
        for (const key in obj) {
          if (/^\$/.test(key)) {
            delete obj[key];
          } else if (typeof obj[key] === 'object') {
            sanitize(obj[key]);
          }
        }
      }
    };
    
    if (req.body) sanitize(req.body);
    if (req.params) sanitize(req.params);
    next();
  };
};

// Simple XSS sanitizer
const xssSanitize = () => {
  return (req, res, next) => {
    const sanitize = (obj) => {
      if (typeof obj === 'string') {
        return obj.replace(/<script[^>]*>.*?<\/script>/gi, '')
                 .replace(/<[^>]*>/g, '');
      }
      if (obj && typeof obj === 'object') {
        for (const key in obj) {
          obj[key] = sanitize(obj[key]);
        }
      }
      return obj;
    };
    
    if (req.body) req.body = sanitize(req.body);
    if (req.params) req.params = sanitize(req.params);
    next();
  };
};

// Rate limiting
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later'
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // limit each IP to 5 login attempts per windowMs
  message: 'Too many login attempts, please try again later'
});

// Security middleware setup
export const setupSecurity = (app) => {
  // Helmet for security headers
  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }));

  // Data sanitization against NoSQL query injection
  app.use(mongoSanitize());

  // Data sanitization against XSS
  app.use(xssSanitize());

  // Prevent parameter pollution
  app.use(hpp());
};