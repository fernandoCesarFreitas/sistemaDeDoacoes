import { Router } from "express";
import { ItemController } from "../controllers/ItemController";
let itemController: ItemController = new ItemController();

let rotas:Router = Router();
//listar
rotas.get("/itens", itemController.list);
//visualizar 1 usuario pelo id
rotas.get("/itens/:id",itemController.find);
//criar
// rotas.post("/itens",itemController.create);
//atualizar
// rotas.put("/itens/:id",itemController.edit);
//delete
rotas.delete("/itens/:id",itemController.delete);

export default rotas;