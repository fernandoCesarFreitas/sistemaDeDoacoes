import { Categoria } from "../models/Categorias";

export class CategoriasController {

  async list() {
    return await Categoria.find();
  }

  async create (descricao: string) {
    
    return await Categoria.create({
      descricao,
    }).save();
  }

  
  async find (id_categoria: number) {
    return await Categoria.findOneBy({ id_categoria });
  }

  async edit(categoria: Categoria, descricao: string) {
    categoria.descricao = descricao;
    await categoria.save();

    return categoria;
  }
  
  async delete(categoria: Categoria): Promise<void> {
    await categoria.remove();
  }

}