exports.up = knex => {
  return knex.schema.createTable('products', table => {
    table.increments('id').primary()
    table.string('name', 100).notNullable()
    table.text('description')
    table.integer('category_id').references('id').inTable('product_category')
    table.string('img_url', 245).notNullable()
    table.string('price', 100).notNullable()

    table.integer('user_id').references('id').inTable('users')
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })
}

exports.down = knex => {
  return knex.schema.dropTable('products')
}
