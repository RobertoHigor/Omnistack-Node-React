const express = require('express');
const routes = express.Router(); // Desacoplando

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

/**
 * Rota / Recurso
 */

 /**
  * Métodos HTTP:
  * 
  * GET: Buscar/Listar uma informação do back-end
  * POST: Criar uma informação no back-end
  * PUT: Alterar uma informação no back-end
  * DELETE: Deletar uma informaçaõ no bakc-end.
  */

  /**
   * Tipos de Parâmetros:
   * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, Paginação). '/rota?parametro=valor'
   * Route Params: Parâmetros utilizados para identificar recursos específicos. '/rota/:id
   * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
   */
// Login
routes.post('/sessions', SessionController.create);

// Listar
    routes.get('/ongs', OngController.index);
    routes.get('/incidents', IncidentController.index);
    routes.get('/profile', ProfileController.index);

// Insert
    routes.post('/ongs', OngController.create);
    routes.post('/incidents', IncidentController.create);
  
// Delete
routes.delete('/incidents/:id', IncidentController.delete);
module.exports = routes;