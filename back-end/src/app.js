//Importando e instanciando as funcionalidades do express
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express(); // Desacoplando o express na variável router

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
module.exports = app;