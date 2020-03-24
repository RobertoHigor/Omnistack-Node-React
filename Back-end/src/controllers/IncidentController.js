const connection = require('../database/connection');
module.exports = {
    async index(request, response){
        // Paginação pulando a cada 5 registros
        const { page = 1} = request.query;
        
        const [count] = await connection('incidents').count();
        //Nesse caso foi específicado os campos da ong para retornar pois o id da ong estava sobrepondo o id do incidents
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //Retornar os dados da ong com o mesmo id do caso
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf']);
        
        // Geralmente o total de itens é retornado pelo Headers, apesar de ser possível pelo corpo
        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },

    async delete(request, response){       
        const { id } = request.params;
        const ong_id = request.headers.authorization; //Para verificar se o incidente pertence a ong autenticada

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.'});
        }

        await connection('incidents').where('id', id).delete();
        return response.status(204).send(); //No content
    },

    async create(request, response){
        const { title, description, value} = request.body;
        const ong_id = request.headers.authorization; //Pegar o ID do header authorization

        //Nesse caso retorna um array de apenas um valor
        const [id] = await connection('incidents').insert({//Armazenar o primeiro valor do array na variável id
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    }
};