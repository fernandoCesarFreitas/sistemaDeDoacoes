import { Item } from "../models/Item";
import { ILike } from "typeorm";
import { Request, Response } from "express";
let item: Item = new Item();

export class ItemController {
  
  async list(req: Request, res: Response): Promise<Response> {
    let nome = req.query.nome;

    let users: Item[] = await Item.findBy({
      nome: nome ? ILike(`%${nome}%`):undefined
    }); //aqui na lista nao usamos as {}
    return res.status(200).json(users);
  }

  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body; //pega o que vem da tela

    let item: Item = await Item.create({
      nome: body.nome,
      situacao: body.situacao,
    }).save(); //cria o usuario

    return res.status(200).json(item); //retorna o usuario criado e o status que deu certo
  }

  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let item: Item = res.locals.item;
    item.nome = body.nome;
    item.situacao = body.situacao;

    await item.save();

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
