import { CidadesController } from './../controllers/CidadesController';
import { Router, Request, Response, NextFunction  } from "express";
import * as yup from "yup";
import { Cidade } from '../models/Cidades';

let cidadesController: CidadesController = new CidadesController();

async function validarPayload(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    let schema = yup.object({
      nome: yup.string().min(3).max(255).required(),
     
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
  
    let cidade: Cidade | null = await Cidade.findOneBy({ id_cidade:id });
  
    if (!cidade) {
      return res.status(422).json({ error: "usuario nao encontrado" });
    }
    res.locals.cidade = cidade;
  
    return next();
  }

let rotas:Router = Router();
//listar
rotas.get("/cidades", cidadesController.list);
//visualizar 1 usuario pelo id
rotas.get("/cidades/:id",validar,cidadesController.find);
//criar
rotas.post("/cidades",validarPayload,cidadesController.create);
//atualizar
rotas.put("/cidades/:id",validar,validarPayload,cidadesController.edit);
//delete
rotas.delete("/cidades/:id",validar,cidadesController.delete);

export default rotas;