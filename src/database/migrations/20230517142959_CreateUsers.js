exports.up = knex => {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table
    .enum("role", ["admin", "customer"], { useNative: true, enumName: "roles" })
    .notNullable().default("customer")
  })
}

exports.down = knex => {
  return knex.schema.dropTable('users')
}