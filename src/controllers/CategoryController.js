const CategoryRepository = require('../repositories/CategoryRepository');
const categoryRepository = new CategoryRepository();

class CategoryController {
  async create(request, response) {
    const { name } = request.body

    try {
      await categoryRepository.create({
        name
      })
      return response.status(201).json({ message: 'Categoria cadastrada com sucesso!' })
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao cadastrar categoria!' })
    }
  }

  async index(request, response) {
    try {
      const productsGet = await categoryRepository.getAll()
      return response.json({ message: 'Categorias encontradas com sucesso!', productsGet })
      
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar Categorias!'})
    }      
  }

}

module.exports = CategoryController
