import { Voluntario } from './../models/Voluntarios';
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export class AutenticacaoController {
  async login(req: Request, res: Response): Promise<Response> {
    let email: string = req.body.email;
    let senha: string = req.body.senha;

    let usuario: Voluntario | null = await Voluntario.findOne({
      where: { email: email }, //compara todos os email com o email digitado
      select: ["idvoluntario", "email", "senha"], //busca mesmo que mande nao mostrar a nivel de db
    });
    if (!usuario) {
      // se nao encontrar nenhum
      return res.status(401).json({ mensagem: "Dados não encontrados!" });
    }
    let resultado = await bcrypt.compare(senha, usuario.senha); //substitui a função que estava usando

    if (!resultado) {
      return res.status(401).json({ mensagem: "Senha inválida!" }); // essas mensagens são usados no navegador
    }
    let token: string = Buffer.from(`${email}:${senha}`).toString("base64");
    return res.status(200).json({ token, type: "Basic" });
  }
}
