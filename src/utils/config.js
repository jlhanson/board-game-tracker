/* eslint-disable no-undef */
require('dotenv').config()

const PORT = process.env.PORT
const MONGO_PROD_URI = process.env.MONGO_PROD_URI

module.exports = {
	MONGO_PROD_URI,
	PORT
}