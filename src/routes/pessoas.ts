import { Router, Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { Pessoas } from "../models/Pessoas";
import { PessoasController } from "../controllers/PessoasController";
let pessoasController: PessoasController = new PessoasController();

async function validarPayload(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    let schema = yup.object({
      nome: yup.string().min(3).max(255).required(),
      endereco:yup.string().min(3).max(255).required(),
      cidade_id_cidade: yup.number().integer(),
    });
    let payload = req.body;
    try {
      req.body = await schema.validate(payload, {
        abortEarly: false,
        stripUnknown: true,
      });
      return next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({ erros: error.errors });
      }
      return res.status(500).json({ error: "ops" });
    }
  }

  async function validar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    let id = Number(req.params.id);
  
    let pessoa: Pessoas | null = await Pessoas.findOneBy({ idPessoa:id });
  
    if (!pessoa) {
      return res.status(422).json({ error: "Pessoa não encontrada!" });
    }
    res.locals.pessoa = pessoa;
  
    return next();
  }


let rotas:Router = Router();
//listar
rotas.get("/pessoas", pessoasController.list);
//visualizar 1 usuario pelo id
rotas.get("/pessoas/:id",validar,pessoasController.find);
//criar
rotas.post("/pessoas",validarPayload,pessoasController.create);
//atualizar
rotas.put("/pessoas/:id",validar,validarPayload,pessoasController.edit);
//delete
rotas.delete("/pessoas/:id",validar,pessoasController.delete);

export default rotas;