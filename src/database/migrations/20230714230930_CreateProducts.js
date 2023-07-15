exports.up = knex => {
  return knex.schema.createTable('products', table => {
    table.increments('id')
    table.string('name', 100).notNullable()
    table.text('description')
    table.string('category', 245).notNullable()
    table.string('img_url', 245).notNullable()
    table.string('ingredients', 245).notNullable()
    table.string('price', 100).notNullable()

    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })
}

exports.down = knex => {
  return knex.schema.dropTable('products')
}
