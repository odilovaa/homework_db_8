const Joi = require("joi")

class registerValidator {
    static async add({name, kg, price, category_id, is_active})
    {
        const {error} = Joi.object({
            name: Joi.string().max(64).required(),
            kg: Joi.number().required(),
            price: Joi.number().required(),
            category_id: Joi.number().required(),
            is_active: Joi.boolean().required()
        }).validate({name, kg, price, category_id, is_active});

        if (error) {
            return {error}
        } else {
            return {error: false}
        }
    }

    static async sell({name, kg})
    {
        const {error} = Joi.object({
            name: Joi.string().max(64).required(),
            kg: Joi.number().required(),
        }).validate({name, kg});

        if (error) {
            return {error}
        } else {
            return {error: false}
        }
    }

}


module.exports = registerValidator;