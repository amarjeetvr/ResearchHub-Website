import Joi from 'joi';

// Validation schemas
export const userValidation = {
  register: Joi.object({
    fullname: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('client', 'freelancer').required()
  }),
  
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
};

export const projectValidation = {
  create: Joi.object({
    title: Joi.string().min(5).max(200).required(),
    introduction: Joi.string().min(10).max(1000).required(),
    detailedRequirements: Joi.string().min(20).required(),
    skills: Joi.alternatives().try(
      Joi.array().items(Joi.string()),
      Joi.string()
    ).required(),
    deliverables: Joi.string().min(10).required(),
    deadline: Joi.date().greater('now').required(),
    budgetMin: Joi.number().positive().required(),
    budgetMax: Joi.number().positive().greater(Joi.ref('budgetMin')).required(),
    category: Joi.string().optional()
  })
};

// Validation middleware
export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details[0].message,
        success: false
      });
    }
    next();
  };
};