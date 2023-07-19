const knex = require('../database')

class ProductController {
  async create(request, response) {
    const { name, description, category, img_url, ingredients, price } = request.body

    await knex('products').insert({
      name,
      description,
      category,
      img_url,
      ingredients,
      price
    })

    return response.status(201).json()
  }

  async index(request, response) {
    const productsGet = await knex('products')
      .orderBy('created_at')
      
    return response.json(productsGet)
  }

}

module.exports = ProductController
