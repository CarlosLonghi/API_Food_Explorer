const knex = require('../database')

class ProductRepository {
  async create({ name, description, category_id, img_url,  price, ingredients }) {
    const [productId] = await knex('products').insert({
      name,
      description,
      category_id,
      img_url,
      price
    })

    const ingredientsInsert = ingredients.map(name => {
      return {
        name,
        product_id: productId
      }
    })
    
    await knex('product_ingredients').insert(ingredientsInsert);

    return { id: productId }
  }

  async update(id, { name, description, category_id, img_url, price, ingredients }) {
    await knex('products').where('id', id).update({
      name,
      description,
      category_id,
      img_url,
      price
    });

    // GET ingredients product
    const existingIngredients = await knex('product_ingredients')
    .where('product_id', id)
    .select('name');

    const existingIngredientsNames = existingIngredients.map(ingredient => ingredient.name);

    // UPDATE/INSERT Ingredients in List
    for (const ingredientName of ingredients) {
      if (existingIngredientsNames.includes(ingredientName)) {
        await knex('product_ingredients')
          .where({ product_id: id, name: ingredientName })
          .update({ name: ingredientName });
      } else {
        await knex('product_ingredients').insert({
          name: ingredientName,
          product_id: id,
        });
      }
    }

    // DELETE Ingredients in List
    for (const ingredientName of existingIngredientsNames) {
      if (!ingredients.includes(ingredientName)) {
        await knex('product_ingredients')
          .where({ product_id: id, name: ingredientName })
          .del();
      }
    }
  }

  async delete(id) {
    await knex('products').where('id', id).del();
  }

  async getById(id) {
    const product = await knex('products').where('id', id).first();
    return product;
  }

  async getAllByCategory(category_id) {
    const products = await knex('products').where('category_id', category_id);
    return products;
  }

  async categoryExists(category_id) {
    const category = await knex('product_category')
      .where({ id: category_id })
      .select('id')
      .first();

    return !!category;
  }

  async search(name) {
    const product = await knex('products').where('name', name).first()

    return product
  }
}

module.exports = ProductRepository
