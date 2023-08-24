const {fetch, fetchOne} = require("../util/pg");

const addQuery = 
    "insert into workers(fullname, email, password, role, is_active) values($1, $2, $3, $4, $5) returning*";

const getallQuery = "select * from workers order by created_at";


module.exports = {
    add: async (fullname, email, password, role, is_active) =>
      await fetchOne(addQuery, fullname, email, password, role, is_active),
    getall: async () => await fetch(getallQuery),
};