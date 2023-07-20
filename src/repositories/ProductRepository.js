const knex = require('../database')

class ProductRepository {
  async create({ name, description, category_id, img_url, ingredients, price }) {
    const [productId] = await knex('products').insert({
      name,
      description,
      category_id,
      img_url,
      ingredients,
      price
    })

    return { id: productId }
  }
}

module.exports = ProductRepository
