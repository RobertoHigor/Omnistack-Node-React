const express = require('express');
const routes = express.Router(); // Desacoplando
const { celebrate, Segments, Joi} = require('celebrate');

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
    //Validar se o id está sendo enviado
    routes.post('/sessions', SessionController.create);

// Listar
    routes.get('/ongs', OngController.index);
    //Página deve ser numérica e não é obrigatória
    routes.get('/incidents', celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number(),
        })
    }),IncidentController.index);

    //Cabeçalho authorization obrigatório
    routes.get('/profile', celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
    }), ProfileController.index);

// Insert
    //Validando dados obrigatórios, formatos e tamanhos
    routes.post('/ongs', celebrate({ 
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required().min(10).max(11),
            city: Joi.string().required(),
            uf: Joi.string().required().length(2),
        })
    }), OngController.create);

    //Validando Header + Params 
    routes.post('/incidents', celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),

        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            value: Joi.number().required(),
        }),
    }),IncidentController.create);
  
// Delete
    //Validando se o id é numérico e está presente
    routes.delete('/incidents/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        })
    }), IncidentController.delete);
module.exports = routes;