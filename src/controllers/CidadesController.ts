import { Cidade } from "../models/Cidades";
import { Request, Response } from "express";
import { ILike } from "typeorm";
export class CidadesController {
    // async list(): Promise<Cidade[]> {
    //   return await Cidade.find({ where: { situacao: "A" } });
    //   }
    async list(req: Request, res: Response): Promise<Response> {
      let nome = req.query.nome;
  
      let cidades: Cidade[] = await Cidade.findBy({
        nome: nome ? ILike(`%${nome}%`):undefined
      }); //aqui na lista nao usamos as {}
      return res.status(200).json(cidades);
    }

    async create(req: Request, res: Response): Promise<Response> {
      let body = req.body; //pega o que vem da tela
  
      let cidade: Cidade = await Cidade.create({
        nome: body.nome,
        situacao: 'A',
      }).save(); //cria o usuario
  
      return res.status(200).json(cidade); //retorna o usuario criado e o status que deu certo
    }

    async edit(req: Request, res: Response): Promise<Response> {
      let body = req.body;
      let cidade: Cidade = res.locals.cidade;
      cidade.nome = body.nome;
      cidade.situacao = body.situacao;
      await cidade.save();
  
      return res.status(200).json(cidade);
    }
      
      async delete(req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let cidade: Cidade = res.locals.cidade;
        cidade.situacao = 'I';
        await cidade.save();
        return res.status(200).json(cidade);
      }

      async find(req: Request, res: Response): Promise<Response> {
        let cidade: Cidade = res.locals.cidade;
        return res.status(200).json(cidade);
      }
}