require("dotenv/config")

const { env } = process

const config = {
    port : env.PORT,
    jwtsecretkey : env.jwtsecretkey
}

module.exports = config;