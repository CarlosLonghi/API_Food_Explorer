exports.up = knex =>
  knex.schema.createTable('product_category', table => {
    table.increments('id').primary()
    table.string('name', 100).notNullable()
  })

exports.down = knex => knex.schema.dropTable('product_category')