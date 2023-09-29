import { Voluntario } from "../models/Voluntarios";
import * as bcrypt from "bcrypt";
import PromptSync from "prompt-sync";
const prompt = PromptSync();
let user: Voluntario = new Voluntario();
let userId: Voluntario;
import { Request, Response } from "express";

export class VoluntarioController {

  async list(req: Request, res: Response): Promise<Response> {
    let voluntarios: Voluntario[] = await Voluntario.find();

    return res.status(200).json(voluntarios);
  }

  async listActive(req: Request, res: Response): Promise<Response> {
    let voluntarios: Voluntario[] = await Voluntario.find({ where: { situacao: "A" }});

    return res.status(200).json(voluntarios);
  }

  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body;

    let voluntario: Voluntario = await Voluntario.create({
      nome: body.nome,
      senha: body.senha,
      email: body.email,
      situacao: 'A',
    }).save();

    return res.status(200).json(voluntario);
  }

  async edit(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let id = Number(req.params.id);

    let voluntario: Voluntario | null = await Voluntario.findOneBy({ idvoluntario: id });
    if (!voluntario) {
      return res.status(422).json({ error: "Usuário não foi encontrado!" });
    }

      (voluntario.nome = body.nome),
      (voluntario.email = body.email),
      (voluntario.senha = body.senha),
      await voluntario.save();

    return res.status(200).json(voluntario);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let voluntario: Voluntario | null = await Voluntario.findOneBy({ idvoluntario: id });
    if (!voluntario) {
      return res.status(422).json({ error: "Usuário não foi encontrado!" });
    }

    voluntario.remove;

    return res.status(200).json({ text: `Usuário deletado!` });
  }

  async checker(req: Request, res: Response): Promise<Response> {
    let nome;
    let voluntario: Voluntario | null = await Voluntario.findOneBy({ nome: nome });

    if (!voluntario) {
      return res.status(422).json({ error: "Usuário não foi encontrado!" });
    }

    return res.status(200).json({ text: `Usuário encontrado!` });
  }

  async setusuarioLogado(req: Request, res: Response) {
    let body = req.body;
    let id = Number(req.params.id);

    let voluntario: Voluntario | null = await Voluntario.findOneBy({ idvoluntario: id });
    if (voluntario?.situacao != 'A' ) {
      res.status(422).json({ error: "Usuário não esta logado!" });
    } else {
      res.status(200).json({ text: `Usuário encontrado!` });
    }
  }

  getusuarioLogado(): Voluntario {
    return userId;
  }

  async setPassword(password: string): Promise<string> {
    const saltRounds = 10; // Número de rounds de hashing (quanto maior, mais seguro)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async checkPassword(
    inputPassword: string,
    storedHash: string
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, storedHash);
  }
}
