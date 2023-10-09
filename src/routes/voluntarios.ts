import { Router, Request, Response, NextFunction } from "express";
import { VoluntarioController } from "../controllers/VoluntariosController";
import * as yup from "yup";
import { Voluntario } from "../models/Voluntarios";
import { Not } from "typeorm";
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

  async function validarSeEmailExiste(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    let email: string = req.body.email;
    let id : number|undefined =  req.params.id? Number(req.params.id):undefined;
  
    let usuario: Voluntario | null = await Voluntario.findOneBy({ email, idvoluntario: id ? Not(id): undefined });//quando o id do editar for igual o id
    if (usuario) {
      return res.status(422).json({ error: "Email ja cadastrado" });
    }
    return next();
  }


let rotas:Router = Router();
//listar
rotas.get("/voluntarios", voluntarioController.list);
//visualizar 1 usuario pelo id
rotas.get("/voluntarios/:id",validar,voluntarioController.find);
//criar
rotas.post("/voluntarios",validarPayload,validarSeEmailExiste,voluntarioController.create);
//atualizar
rotas.put("/voluntarios/:id",validar,validarPayload,validarSeEmailExiste,voluntarioController.edit);
//delete
rotas.delete("/voluntarios/:id",validar,voluntarioController.delete);

export default rotas;