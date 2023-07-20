const knex = require('../database')

class CategoryController {
  async create(request, response) {
    const { name } = request.body

    try {
      await knex('product_category').insert({ name })

      return response.status(201).json({ message: 'Categoria cadastrada com sucesso!' })
  } catch (error) {
    return response.status(500).json({ error: 'Erro ao cadastrar categoria!' })
  }
  }

  async index(request, response) {
    const productsGet = await knex('product_category')
      
    return response.json(productsGet)
  }

}

module.exports = CategoryController
