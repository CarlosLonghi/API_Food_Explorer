const knex = require('../database')

class CategoryRepository {
  async create({ name }) {
    const [categoryId] = await knex('product_category').insert({ name })

    return { id: categoryId }
  }

  async getAll() {
    const categories = await knex('product_category');
    return categories;
  }
}

module.exports = CategoryRepository
