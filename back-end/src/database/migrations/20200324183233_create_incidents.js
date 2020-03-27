
exports.up = function(knex) { // Resposável pela criação da tabela
    return knex.schema.createTable('incidents', function(table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        //Chave estrangeira com a tabela Ong
        table.string('ong_id').notNullable(); 
        table.foreign('ong_id').references('id').inTable('ongs');
    })
  };
  
  exports.down = function(knex) { //Deletar uma tabela caso ocorra um problema
    return knex.schema.dropTable('incidents');
  };
  