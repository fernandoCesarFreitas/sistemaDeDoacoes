import { CD } from "./../models/Cds";
import { Request, Response } from "express";
import { ILike } from "typeorm";
import { Cidade } from "../models/Cidades";
let cd: CD = new CD();

export class CdController {
  //   }
  async list(req: Request, res: Response): Promise<Response> {
    let nome = req.query.nome;

    let cd: CD[] = await CD.find({
      where: { situacao: "A" },
      // nome: nome ? ILike(`%${nome}%`):undefined
    }); //aqui na lista nao usamos as {}
    return res.status(200).json(cd);
  }

  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body; //pega o que vem da tela
    console.log(body);
    let cd: CD = await CD.create({
      nome: body.nome,
      situacao: "A",
      cidade_id_cidade: body.cidade_id_cidade,
    }).save(); //cria o usuario

    return res.status(200).json(cd); //retorna o usuario criado e o status que deu certo
  }

  async edit(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    console.log(body);
    let cd: CD = res.locals.cd;

    // console.log(id)
    // let categoria: Categoria | null = await Categoria.findOneBy({ id_categoria:id });

    // if (!categoria) {
    //   return res.status(422).json({ error: "Categoria não encontrada!" });
    // }
    console.log(res.locals.cd);
    cd.nome = body.nome;
    cd.situacao = "A";
    cd.cidade_id_cidade = body.cidade_id_cidade;

    let cidade = await Cidade.findOneBy({id_cidade:body.cidade_id_cidade})

    if(cidade){
      cd.cidade = cidade;
      let cidadeSalva = await cd.save();

      return res.status(200).json(cidadeSalva);
    }else{
      return res.status(404).json({mensagem:'Cidade não encontrada!'});
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let cd: CD = res.locals.cd;
    cd.situacao = "I";
    await cd.save();
    return res.status(200).json(cd);
  }
  async find(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let id = Number(req.params.id);

    let cd: CD | null = await CD.findOneBy({ id_CD: id });

    if (!cd) {
      return res.status(422).json({ error: "Cd não encontrado" });
    }

    return res.status(200).json(cd);
  }
}
