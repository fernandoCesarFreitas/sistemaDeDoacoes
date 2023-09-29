import { Router, Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { Categoria } from "../models/Categorias";
import { CategoriasController } from "../controllers/CategoriasController";
let categoriaController: CategoriasController = new CategoriasController();

async function validarPayload(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    let schema = yup.object({
      nome: yup.string().max(3).max(255).required(),
      email: yup.string().email().required(),
      senha: yup.string().min(6).max(16).required(),
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
  
    let categoria: Categoria | null = await Categoria.findOneBy({ id_categoria:id });
  
    if (!categoria) {
      return res.status(422).json({ error: "usuario nao encontrado" });
    }
    res.locals.categoria = categoria;
  
    return next();
  }


let rotas:Router = Router();
//listar
rotas.get("/categorias", categoriaController.list);
//visualizar 1 usuario pelo id
rotas.get("/categorias/:id",validar,categoriaController.find);
//criar
rotas.post("/categorias",validarPayload,categoriaController.create);
//atualizar
rotas.put("/categorias/:id",validar, validarPayload,categoriaController.edit);
//delete
rotas.delete("/categorias/:id",validar,categoriaController.delete);

export default rotas;