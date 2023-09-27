import { Categoria } from "../models/Categorias";
import { Request, Response } from "express";

export class CategoriasController {
  async list(req: Request, res: Response): Promise<Response> {
    let categorias: Categoria[] = await Categoria.find();
    console.log(categorias);
    return res.status(200).json({ categorias });
  }

  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body;

    let categoria: Categoria = await Categoria.create({
      descricao: body.descricao,
    }).save();
    return res.status(200).json(categoria);
  }

  async edit(req: Request, res: Response): Promise<Response> {
    let body = req.body;

    let id: number = Number(req.params.id);
    console.log(id)
    let categoria: Categoria | null = await Categoria.findOneBy({ id_categoria:id });

    if (!categoria) {
      return res.status(422).json({ error: "Categoria não encontrada!" });
    }
    categoria.descricao = body.descricao;
    await categoria.save();

    return res.status(200).json(categoria);
  }

  async delete (req: Request, res: Response): Promise<Response>{
    let body = req.body;
    let id = Number(req.params.id);

    let categoria: Categoria | null =  await Categoria.findOneBy({id_categoria:id});

    if(!categoria){
        return res.status(422).json({error:'produto não encontrado'});
    }
    categoria.remove();
    return res.status(200).json();
}

  async find(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let id = Number(req.params.id);

    let categoria: Categoria | null = await Categoria.findOneBy({ id_categoria:id });

    if (!categoria) {
      return res.status(422).json({ error: "produto não encontrado" });
    }

    return res.status(200).json(categoria);
  }
}
