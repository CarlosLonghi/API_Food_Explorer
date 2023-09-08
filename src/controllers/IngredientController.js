const IngredientRepository = require('../repositories/IngredientRepository');
const ingredientRepository = new IngredientRepository();

class IngredientController { 
  async index(request, response) {
    const { product_id } = request.query;

    try {
      const ingredients = await ingredientRepository.getIngredients(product_id)
      return response.json(ingredients)
      
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar ingredientes!' });
    }
  }
}

module.exports = IngredientController