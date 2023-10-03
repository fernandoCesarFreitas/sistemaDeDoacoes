import { Router, Request, Response, NextFunction } from "express";
import { VoluntarioController } from "../controllers/VoluntariosController";
import * as yup from "yup";
import { Voluntario } from "../models/Voluntarios";
let voluntarioController: VoluntarioController = new VoluntarioController();

async function validarPayload(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    let schema = yup.object({
      nome: yup.string().min(3).max(255).required(),
      email: yup.string().email().min(3).max(255).required(),
      senha:yup.string().min(3).max(255).required(),
      situacao:yup.string().min(1).max(1).required()
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
  
    let voluntario: Voluntario | null = await Voluntario.findOneBy({ idvoluntario:id });
  
    if (!voluntario) {
      return res.status(422).json({ error: "Voluntario não encontrada!" });
    }
    res.locals.voluntario = voluntario;
  
    return next();
  }


let rotas:Router = Router();
//listar
rotas.get("/voluntarios", voluntarioController.list);
//visualizar 1 usuario pelo id
rotas.get("/voluntarios/:id",validar,voluntarioController.find);
//criar
rotas.post("/voluntarios",validarPayload,voluntarioController.create);
//atualizar
rotas.put("/voluntarios/:id",validar,validarPayload,voluntarioController.edit);
//delete
rotas.delete("/voluntarios/:id",validar,voluntarioController.delete);

export default rotas;