const Joi = require("joi")

const authorSchema = Joi.object({
    fullName: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(5).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirm_password: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match'
    }),
    email: Joi.string().required().email(),
    profession: Joi.string().min(10).required(),
    bio: Joi.string().min(10).required(),
    facebook: Joi.string().min(10).required(),
    instagram: Joi.string().min(10).required(),
    twitter: Joi.string().min(10).required(),
    linkedin: Joi.string().min(10).required()
})

const authorPassword = Joi.object({
    id: Joi.string().required(),
    old_password: Joi.string().required(),
    password: Joi.string().min(5).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirm_password: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match'
    }),
})

const updateAuthor = Joi.object({
    id: Joi.string().required(),
    fullName: Joi.string().min(3).max(30).required(),
    profession: Joi.string().min(10).required(),
    bio: Joi.string().min(10).required(),
    facebook: Joi.string().min(10).required(),
    instagram: Joi.string().min(10).required(),
    twitter: Joi.string().min(10).required(),
    linkedin: Joi.string().min(10).required()
})

module.exports = {
    updateAuthor,
    authorPassword,
    authorSchema
}