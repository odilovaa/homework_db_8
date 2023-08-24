const productQuery = require("../query/product.query");
const CustomError = require("../util/custom-error");
const {fetch, fetchOne} = require("../util/pg");
const productValidator = require("../validation/product.validation");


const getall = async (req, res, next) =>
{
    try {
        const datas = await productQuery.getall();
    
        res.json({message: "Success", data: datas});
    } catch (error) {
        next(error);
    }
};


const sell_product = async (req, res, next) =>
{
    try {
        const {name, kg} = req.body;

        const result = await productValidator.sell({name, kg});
        if (result.error) throw new CustomError(result.error.message, 400);

        const isFind = await productQuery.getbyid(name)

        let data = []
        
        if(isFind.length)
        {
            data = await productQuery.sell_product(name, kg);
            await productQuery.set_history(req.c_id, isFind.id, true, isFind.kg, isFind.price)
        }
        else{
            res.json({message: 'product not found!'})
        }

        res.status(201).json({message: "Success", data});

    } catch (error) {
        next(error);
    }
};


const buy_product = async (req, res, next) =>
{
    try {
        const {name, kg, price, category_id, is_active} = req.body;

        const result = await productValidator.add({name, kg, price, category_id, is_active});
        if (result.error) throw new CustomError(result.error.message, 400);

        let isFind = await productQuery.getbyid(name)

        let data = []
        
        if(isFind.length)
        {
            data = await productQuery.buy_product1(name, kg);
        }
        else{
            data = await productQuery.buy_product2(name, kg, price, category_id, is_active);
        }

        isFind = await productQuery.getbyid(name)
        await productQuery.set_history(req.c_id, isFind.id, false, isFind.kg, isFind.price)
            
        res.status(201).json({message: "Success", data});

    } catch (error) {
        next(error);
    }
};

const getall_history = async (req, res, next) =>
{
    try {
        const datas = await productQuery.getall();
    
        res.json({message: "Success", data: datas});
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getall, sell_product, buy_product, getall_history
}