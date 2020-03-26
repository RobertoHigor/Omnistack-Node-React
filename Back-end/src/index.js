//Importando e instanciando as funcionalidades do express
const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const app = express(); // Desacoplando o express na variável router

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);