const {fetch, fetchOne} = require("../util/pg");

const addQuery = 
    "insert into product(name, kg, price, category_id, is_active) values($1, $2, $3, $4, $5) returning*";

const getallQuery = 
    "select * from product order by created_at";

const getbyidQuery = 
    "select * from product where name = $1"

const buy_productQuery1 = 
    "update product set kg = kg + $2 where name = $1 returning*"

const buy_productQuery2 = 
    "insert into product(name, kg, price, category_id, is_active) values($1, $2, $3, $4, $5) returning*"

const sell_productQuery =  
    "update product set kg = kg - $2 where name = $1 returning*"

const set_historyQuery = 
    "insert into history(worker_id, product_id, id_sell, kg, price) values($1, $2, $3, $4, $5)"

const getall_historyQuery = 
    "select * from history order by created_at"


module.exports = {
    add: async (name, kg, price, category_id, is_active) =>
      await fetchOne(addQuery, name, kg, price, category_id, is_active),
    getall: async () => 
        await fetch(getallQuery),
    getall_history: async () => 
        await fetch(getall_historyQuery),
    getbyid: async (name) => 
        await fetch(getbyidQuery, name),
    buy_product2: async (name, kg, price, category_id, is_active) =>
        await fetchOne(buy_productQuery2, name, kg, price, category_id, is_active),
    buy_product1: async (name, kg) =>
        await fetchOne(buy_productQuery1, name, kg),
    sell_product: async (name, kg) =>
        await fetchOne(sell_productQuery, name, kg),
    set_history: async (worker_id, product_id, id_sell, kg, price) =>
        await fetchOne(set_historyQuery, worker_id, product_id, id_sell, kg, price)
    
};