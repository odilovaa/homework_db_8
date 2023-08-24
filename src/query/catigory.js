const {fetch, fetchOne} = require("../util/pg");

const addQuery = 
    "insert into category(name, is_active) values($1, $2) returning*";

const getallQuery = "select * from category  order by created_at";


module.exports = {
    add: async (name, is_active) =>
      await fetchOne(addQuery, name, is_active),
    getall: async () => await fetch(getallQuery),
};