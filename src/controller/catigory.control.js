const categoryQuery = require("../query/catigory");
const CustomError = require("../util/custom-error");
const {fetch, fetchOne} = require("../util/pg");
const categoryValidator = require("../validation/category.validation");
const config = require("../../config")

const add = async (req, res, next) =>
{
    try {
        const {name, is_active} = req.body;

        const result = await categoryValidator.add({name, is_active});
        if (result.error) throw new CustomError(result.error.message, 400);

        const data = await categoryQuery.add(name, is_active);


        res.status(201).json({message: "Success", data});

    } catch (error) {
        next(error);
    }
};

const getall = async (req, res, next) =>
{
    try {
        const datas = await categoryQuery.getall();
    
        res.json({message: "Success", data: datas});
    } catch (error) {
        next(error);
    }
};

module.exports = { add, getall };