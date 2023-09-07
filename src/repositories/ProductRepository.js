const knex = require('../database')

class ProductRepository {
  async create({ name, description, category_id, img_url,  price }) {
    const [productId] = await knex('products').insert({
      name,
      description,
      category_id,
      img_url,
      price
    })

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

  async getById(id) {
    const product = await knex('products').where('id', id).first();
    return product;
  }
  
  async getAllByCategory(category_id) {
    const products = await knex('products').where('category_id', category_id);
    return products;
  }

  async delete(id) {
    await knex('products').where('id', id).del();
  }
}

module.exports = ProductRepository
