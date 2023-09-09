const ProductRepository = require('../repositories/ProductRepository');
const productRepository = new ProductRepository();

class ProductController {
  async create(request, response) {
    const { name, description, category_id, img_url, price, ingredients } = request.body;

    try {
      const categoryExists = await productRepository.categoryExists(category_id);
      if (!categoryExists) {
        return response.status(400).json({ error: 'Categoria não encontrada' });
      }

      await productRepository.create({
        name,
        description,
        category_id,
        img_url,
        price, 
        ingredients
      });

      return response.status(201).json({ message: 'Produto cadastrado com sucesso!' });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: 'Erro ao cadastrar o produto!' });
    }
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, description, category_id, img_url, price, ingredients } = request.body;

    try {
      const productExists = await productRepository.getById(id);
      if (!productExists) {
        return response.status(404).json({ error: 'Produto não encontrado' });
      }

      const categoryExists = await productRepository.categoryExists(category_id);
      if (!categoryExists) {
        return response.status(400).json({ error: 'Categoria não encontrada' });
      }

      await productRepository.update(id, {
        name,
        description,
        category_id,
        img_url,
        price, 
        ingredients
      });

      return response.status(200).json({ message: 'Produto atualizado com sucesso!' });
      
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao atualizar o produto!' });
    }
  }

  async index(request, response) {
    const { category_id, name } = request.query;

    try {
      let products;

      if (name) {
        const product = await productRepository.search(name);
        if (product) {
          products = [product];
        } else {
          products = [];
        }
      } else {
        products = await productRepository.getAllByCategory(category_id);
      }
      return response.json(products);

    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar os produtos!' });
    }
  }

  async show(request, response) {
    const { id } = request.params;

    try {
      const product = await productRepository.getById(id);

      if (!product) {
        return response.status(404).json({ error: 'Produto não encontrado' });
      }

      return response.json(product);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar o produto!' });
    }
  }

  async delete(request, response) {
    const { id } = request.params;

    try {
      const productExists = await productRepository.getById(id);
      if (!productExists) {
        return response.status(404).json({ error: 'Produto não encontrado' });
      }

      await productRepository.delete(id);

      return response.json({ message: 'Produto excluído!' });
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao excluir o produto!' });
    }
  }
}

module.exports = ProductController
