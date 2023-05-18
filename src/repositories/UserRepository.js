const knex = require('../database')

class UserRepository {
  async findByEmail(email) {
    const user = await knex('users').where('email', email).first()

    return user
  }

  async create({ name, email, password, is_admin }) {
    const [userId] = await knex('users').insert({ name, email, password, is_admin })

    return { id: userId }
  }
}

module.exports = UserRepository