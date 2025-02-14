import Joi from "joi";

export const authFormValidator = Joi.object({
    username: Joi.string().max(20).pattern(/^[a-zA-Zа]{1,20}$/).required().messages({
        'string.pattern.base': ' only alphabetic latin characters allowed',
        'string.max': ' username max length 20 chars',
    }),
    password: Joi.string().min(4).max(15).required().messages({
        'string.min': ' min password length 4 chars',
        'string.max': ' max password length 15 chars',
    }),
    usersSelect: Joi.options({ allowUnknown: true })
});