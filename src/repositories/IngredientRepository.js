const knex = require('../database')

class IngredientRepository {
  async getIngredients(product_id) {
    const ingredients = await knex('product_ingredients').where({ product_id }).groupBy('name')
    return ingredients;
  }
}

module.exports = IngredientRepository
