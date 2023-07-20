const knex = require('../database')

class CategoryRepository {
  async create({ name }) {
    const [categoryId] = await knex('product_category').insert({ name })

    return { id: categoryId }
  }
}

module.exports = CategoryRepository
