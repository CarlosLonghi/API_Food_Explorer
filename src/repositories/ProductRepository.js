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

  async update(id, { name, description, category_id, img_url, price }) {
    await knex('products').where('id', id).update({
      name,
      description,
      category_id,
      img_url,
      price
    });
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
