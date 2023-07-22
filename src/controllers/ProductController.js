const knex = require('../database')

class ProductController {
  async create(request, response) {
    const { name, description, category_id, img_url, ingredients, price } = request.body

    const categoryExists = await knex('product_category').where('id', category_id).first()

    if (!categoryExists) {
      return response.status(400).json({ error: 'Categoria não encontrada' })
    }

    try {
      await knex('products').insert({
        name,
        description,
        category_id,
        img_url,
        ingredients,
        price
      })

      return response.status(201).json({ message: 'Produto cadastrado com sucesso!' })
  } catch (error) {
    return response.status(500).json({ error: 'Erro ao cadastrar o produto!' })
  }
  }

  async index(request, response) {
    const { category_id } = request.query;
  
    const productsWithCategory = await knex('products')
      .join('product_category', 'products.category_id', '=', 'product_category.id')
      .select('products.*', 'product_category.name as category_name')
      .where('products.category_id', category_id);
    return response.json(productsWithCategory);
  }
  
  async delete(request, response) {
    const { id } = request.params

    await knex('products').where({ id }).delete()
    return response.json({ message: 'Produto excluído!' })
  }
}

module.exports = ProductController
