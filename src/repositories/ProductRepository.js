const knex = require('../database')

class ProductRepository {
  async create({ name, description, category_id, img_url,  price, ingredients }) {
    const [productId] = await knex('products').insert({
      name,
      description,
      category_id,
      img_url,
      price,
      user_id
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
    const product = await knex('products as p')
      .where('p.id', id)
      .select('p.id', 'p.name', 'p.description', 'p.category_id', 'p.img_url', 'p.price')
      .first();
  
    if (!product) {
      return null; 
    }
  
    const ingredients = await knex('product_ingredients')
      .where('product_id', id)
      .select('name');
  
    product.ingredients = ingredients.map(ingredient => ingredient.name);
  
    return product;
  }

  async getAllByCategory(category_id) {
    const products = await knex('products as p').where('category_id', category_id).select('p.id', 'p.name', 'p.description', 'p.category_id', 'p.img_url', 'p.price');

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
    const product = await knex('products as p').whereLike('name', `%${name}%`).select('p.id', 'p.name', 'p.description', 'p.category_id', 'p.img_url', 'p.price')

    return product
  }
}

module.exports = ProductRepository
