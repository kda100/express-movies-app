const Joi = require("joi");

exports.registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().error(new Error("Invalid username")),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in", "co", "uk"] } }).required().error(new Error("Invalid email")),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$')).required().error(new Error("Invalid password")),
});