const Joi = require("joi");

const tutorialValidations = {
  createTutorialValidator: {
    body: Joi.object({
      title: Joi.string().trim().min(3).max(100).required(),
      description: Joi.string().trim().min(1).max(5000).required(),
      published: Joi.boolean(),
    }),
  },
};


module.exports = tutorialValidations;
