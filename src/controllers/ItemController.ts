import { Item } from "../models/Item";
import { ILike } from "typeorm";
import { Request, Response } from "express";
let item: Item = new Item();

export class ItemController {
  
  async list(req: Request, res: Response): Promise<Response> {
    let nome = req.query.nome;

    let itens: Item[] = await Item.find({
      relations:['categoria']
      // nome: nome ? ILike(`%${nome}%`):undefined
    }); //aqui na lista nao usamos as {}
    return res.status(200).json(itens);
  }

  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body; //pega o que vem da tela

    let item: Item = await Item.create({
      nome: body.nome,
      situacao: 'A',
      categoria_id_categoria: body.categoria_id_categoria,
    }).save(); //cria o usuario

    return res.status(200).json(item); //retorna o usuario criado e o status que deu certo
  }

  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let item: Item = res.locals.item;
    console.log('update')
    console.log(body)
    item.nome = body.nome;
    item.situacao = 'A';
    item.categoria_id_categoria =  body.categoria_id_categoria;
    await item.save();
    console.log(item)
    return res.status(200).json(item);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let item: Item = res.locals.item;
    item.situacao = 'I';
    await item.save();
    return res.status(200).json(item);
  }
  
  async find(req: Request, res: Response): Promise<Response> {
    let item: Item = res.locals.item;
    return res.status(200).json(item);
  }
}
