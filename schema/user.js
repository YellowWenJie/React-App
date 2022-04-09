/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */
const Joi = require("joi");

const user = Joi.object({
  username: Joi.string().alphanum().min(1).max(20).required(),
  password: Joi.string()
    .pattern(/^[\S]{6,12}$/)
    .required(),
  realname: Joi.string(),
});

const email = Joi.object({
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
    .required(),
  verify: Joi.string().alphanum().min(6).max(6),
});

module.exports = {
  user,
  email,
};
