import { Pessoas } from "../models/Pessoas";
import { Request, Response } from "express";
import { Cidade } from "../models/Cidades";
let pessoa: Pessoas = new Pessoas();

export class PessoasController {

  async list(req: Request, res: Response): Promise<Response> {
    let descricao = req.query.nome;

    let pessoa: Pessoas[] = await Pessoas.find({
      relations: ["cidade"]
      // nome: descricao ? ILike(`%${descricao}%`):undefined ,
    });
    return res.status(200).json( pessoa );
  }

  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body;
     console.log(body)
    let pessoa: Pessoas = await Pessoas.create({
      nome: body.nome,
      endereco: body.endereco,
      cidade_id_cidade: body.cidade_id_cidade,
    }).save();
    return res.status(200).json(pessoa);
  }

  async edit(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let pessoa : Pessoas = res.locals.pessoa;
    pessoa.nome = body.nome;
    pessoa.endereco =  body.endereco;
    pessoa.cidade_id_cidade =  body.cidade_id_cidade;
   
    let cidade = await Cidade.findOneBy({
      id_cidade: body.cidade_id_cidade,
    });
    if(cidade){
      pessoa.cidade = cidade;
      let cidadeSalva = await pessoa.save();
        console.log(cidadeSalva)
      return res.status(200).json(cidadeSalva);
    }else{
      return res.status(404).json({mensagem:'Cidade não encontrada!'});
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let id = Number(req.params.id);

    let pessoa: Pessoas | null = await Pessoas.findOneBy({ idPessoa:id });

    if (!pessoa) {
      return res.status(422).json({ error: "Pessoa não encontrado" });
    }

    return res.status(200).json(pessoa);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let pessoa : Pessoas = res.locals.pessoa;
    pessoa.remove();
    return res.status(200).json();
  }
  // async list() {
  //   return await Pessoas.find({ relations: ["cidade"] });
  // }

  // async find(idPessoa: number) {
  //   return await Pessoas.findOneBy({ idPessoa });
  // }

  // async create(
  //   nome: string,
  //   endereco: string,
  //   cidadeId: number
  // ): Promise<Pessoas> {
  //   pessoa.nome = nome;
  //   pessoa.endereco = endereco;
  //   pessoa.cidade_id_cidade = cidadeId;

  //   await pessoa.save();
  //   return pessoa;
  // }

  // async edit(pessoa: Pessoas, nome: string, endereco: string) {
  //   pessoa.nome = nome;
  //   pessoa.endereco = endereco;
  //   await pessoa.save();

  //   return pessoa;
  // }

  // async delete(pessoa: Pessoas): Promise<void> {
  //   await pessoa.remove();
  // }
}
