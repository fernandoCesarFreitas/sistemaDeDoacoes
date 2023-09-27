import { CD } from "./../models/Cds";
import { Request, Response } from "express";
let cd: CD = new CD();

export class CdController {
  async list(req: Request, res: Response): Promise<Response> {
    let cd: CD[] = await CD.find();
    return res.status(200).json({ cd });
  }

  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body; //pega o que vem da tela

    let cd: CD = await CD.create({
      nome: body.nome,
      situacao: "A",
    }).save(); //cria o usuario

    return res.status(200).json(cd); //retorna o usuario criado e o status que deu certo
  }

  async edit(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let id = Number(req.params.id);

    let cd: CD | null = await CD.findOneBy({ id_CD: id });

    if (!cd) {
      return res.status(422).json({ error: "Cd não encontrado" });
    }
    cd.nome = body.nome;
    cd.situacao = body.situacao;
    await cd.save();
    return res.status(200).json(cd);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let id = Number(req.params.id);

    let cd: CD | null = await CD.findOneBy({ id_CD:id });

    if (!cd) {
      return res.status(422).json({ error: "CD não encontrado" });
    }
    cd.remove();
    return res.status(200).json();
  }
  async find(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let id = Number(req.params.id);

    let cd: CD | null = await CD.findOneBy({ id_CD:id });

    if (!cd) {
      return res.status(422).json({ error: "cd não encontrado" });
    }

    return res.status(200).json(cd);
  }
}
