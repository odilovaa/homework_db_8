const Joi = require("joi")

class registerValidator {
    static async add({fullname, email, password, role, is_active})
    {
        const {error} = Joi.object({
            fullname: Joi.string().max(64).required(),
            email: Joi.string().max(50).required(),
            role: Joi.boolean().required(),
            password: Joi.string().max(100).required(),
            is_active: Joi.boolean().required()
        }).validate({fullname, email, password, role, is_active});

        if (error) {
            return {error}
        } else {
            return {error: false}
        }
    }
}


module.exports = registerValidator;