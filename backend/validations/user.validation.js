const mongoose = require("mongoose");
const Joi = require("joi");

const userValidation = (data) => {
  const userSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });

  return userSchema.validate(data);
};

module.exports.userValidation = userValidation;
