const slug = require("slugify");

const generateSlug = (sentance) => {
  return slug(sentance, {
    replacement: "-",
    lower: false,
  });
};



module.exports = {generateSlug}
