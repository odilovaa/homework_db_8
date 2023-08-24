const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerQuery = require("../query/register.query");
const CustomError = require("../util/custom-error");
const {fetch, fetchOne} = require("../util/pg");
const registerValidator = require("../validation/register.validation");
const config = require("../../config")

const add = async (req, res, next) =>
{
    try {
        const {fullname, email, password, role, is_active} = req.body;

        const pass = await bcrypt.hash(password,12);

        const result = await registerValidator.add({fullname, email, password, role, is_active});
        if (result.error) throw new CustomError(result.error.message, 400);

        const data = await registerQuery.add(fullname, email, pass, role, is_active);

        const token = jwt.sign({id : data.id}, config.jwtsecretkey);

        res.status(201).json({message: "Success", data, token});

    } catch (error) {
        next(error);
    }
};

const getall = async (req, res, next) =>
{
    try {
        const datas = await registerQuery.getall();
    
        res.json({message: "Success", data: datas});
    } catch (error) {
        next(error);
    }
};

module.exports = { add, getall };