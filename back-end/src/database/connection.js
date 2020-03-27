const knex = require('knex');
const configuration = require('../../knexfile');

const config  = process.env.NODE_ENV == 'test' ? configuration.test : configuration.development
const connection = knex(config); //Passar a conexão de desenvolvimento

module.exports = connection;