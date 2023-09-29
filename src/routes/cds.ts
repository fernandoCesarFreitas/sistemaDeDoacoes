import { Router, Request, Response, NextFunction  } from "express";
import { CdController } from "../controllers/CdController";
import { CD } from "../models/Cds";
import * as yup from "yup";
let cdController: CdController = new CdController();

async function validarPayload(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    let schema = yup.object({
      nome: yup.string().max(3).max(255).required(),
      tipe: yup.string().email().required(),
      cidade_id_cidade: yup.number().min(1).max(16).required(),
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
  
    let cd: CD | null = await CD.findOneBy({ id_CD:id });
  
    if (!cd) {
      return res.status(422).json({ error: "usuario nao encontrado" });
    }
    res.locals.cd = cd;
  
    return next();
  }
  
let rotas:Router = Router();
//listar
rotas.get("/cds", cdController.list);
//visualizar 1 usuario pelo id
rotas.get("/cds/:id",validar,cdController.find);
//criar
rotas.post("/cds",validarPayload,cdController.create);
//atualizar
rotas.put("/cds/:id",validar,validarPayload,cdController.edit);
//delete
rotas.delete("/cds/:id",validar,cdController.delete);

export default rotas;