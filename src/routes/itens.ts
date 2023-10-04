import { Router, Request, Response, NextFunction } from "express";
import { ItemController } from "../controllers/ItemController";
import { Item } from "../models/Item";
import * as yup from "yup";
let itemController: ItemController = new ItemController();

async function validarPayload(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  let schema = yup.object({
    nome: yup.string().max(3).max(255).required(),
    situacao: yup.string().min(1).max(1).required(),
    categoria_id_categoria: yup.number().integer(),
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

  let item: Item | null = await Item.findOneBy({ id_item: id });

  if (!item) {
    return res.status(422).json({ error: "Item não encontrado" });
  }
  res.locals.item = item;

  return next();
}

let rotas: Router = Router();
//listar
rotas.get("/itens", itemController.list);
//visualizar 1 usuario pelo id
rotas.get("/itens/:id", validar,itemController.find);
//criar
rotas.post("/itens",validarPayload, itemController.create);
//atualizar
rotas.put("/itens/:id",validar,validarPayload, itemController.update);
//delete
rotas.delete("/itens/:id",validar, itemController.delete);

export default rotas;
