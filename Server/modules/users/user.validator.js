const joi = require("joi");

const Schema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string()
  .regex(/[ -~]*[a-z][ -~]*/) // at least 1 lower-case
  .regex(/[ -~]*[A-Z][ -~]*/) // at least 1 upper-case
  .regex(/[ -~]*(?=[ -~])[^0-9a-zA-Z][ -~]*/) // basically: [ -~] && [^0-9a-zA-Z], at least 1 special character
  .regex(/[ -~]*[0-9][ -~]*/) // at least 1 number
  .min(4)
  .required(),
  phone: joi.string()
  .regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`})
  .required(),
  roles: joi.array().items(joi.string().valid("user", "admin")),
  token: joi.string(),
});

const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string()
  // .regex(/[ -~]*[a-z][ -~]*/) // at least 1 lower-case
  // .regex(/[ -~]*[A-Z][ -~]*/) // at least 1 upper-case
  // .regex(/[ -~]*(?=[ -~])[^0-9a-zA-Z][ -~]*/) // basically: [ -~] && [^0-9a-zA-Z], at least 1 special character
  // .regex(/[ -~]*[0-9][ -~]*/) // at least 1 number
  // .min(4)
   .required(),
});

const resetSchema = joi.object({
  userId: joi.string().required(),
  password: joi.string()
  .regex(/[ -~]*[a-z][ -~]*/) // at least 1 lower-case
  .regex(/[ -~]*[A-Z][ -~]*/) // at least 1 upper-case
  .regex(/[ -~]*(?=[ -~])[^0-9a-zA-Z][ -~]*/) // basically: [ -~] && [^0-9a-zA-Z], at least 1 special character
  .regex(/[ -~]*[0-9][ -~]*/) // at least 1 number
  .min(4)
  .required(),
});

// profile
const userSchema = joi.object({
  userId: joi.string(),
  name: joi.string(),
  phone: joi.string()
  .regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`})
  .required(),
});

const validate = (req, res, next) => {
  const { error } = Schema.validate(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
  } else {
    next();
  }
};
const resetValidation = (req, res, next) => {
  const { error } = resetSchema.validate(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
  } else {
    next();
  }
};

const loginValidatation = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
  } else {
    next();
  }
};
const userValidation = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
  } else {
    next();
  }
};

module.exports = {
  validate,
  resetValidation,
  loginValidatation,
  userValidation,
  
};
