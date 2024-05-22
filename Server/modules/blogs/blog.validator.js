const joi = require("joi");

const Schema = joi.object({
  title: joi.string().required(),
  tags: [joi.string()],
  content: joi.string().required(),
  author: joi.string(),
  words: joi.number(),
  status: joi.string(),
  image: joi.string(),
  publishedDate: joi.date().min("now"),
});
const validate = (req, res, next) => {
  const { error } = Schema.validate(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
  } else {
    next();
  }
};

module.exports = { validate };
