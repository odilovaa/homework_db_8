const Joi = require("joi")

class registerValidator {
    static async add({name, is_active})
    {
        const {error} = Joi.object({
            name: Joi.string().max(64).required(),
            is_active: Joi.boolean().required()
        }).validate({name, is_active});

        if (error) {
            return {error}
        } else {
            return {error: false}
        }
    }
}


module.exports = registerValidator;