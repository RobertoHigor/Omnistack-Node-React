const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection')

// Listar
module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*');
 
        return response.json(ongs);
    },

// Inserir
    async create(request, response) {       
        const {name, email, whatsapp, city, uf} = request.body;

        const id = generateUniqueId();

        //Como o insert pode demorar um pouco, é preciso retornar o resultado só depois de finalizado
        //await faz com que o Node aguarde o código await finalizar para continuar.
        await connection('ongs').insert({ 
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });
    }
};