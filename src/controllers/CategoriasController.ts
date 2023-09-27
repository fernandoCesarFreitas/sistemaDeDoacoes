import { Categoria } from "../models/Categorias";
import { Request, Response } from "express";

export class CategoriasController {

  async list (req: Request, res: Response):Promise<Response>{
    let categorias: Categoria[] = await Categoria.find()
    console.log(categorias);
     return res.status(200).json({categorias})
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