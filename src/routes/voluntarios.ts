import { Router } from "express";
import { VoluntarioController } from "../controllers/VoluntariosController";
let voluntarioController: VoluntarioController = new VoluntarioController();

let rotas:Router = Router();
//listar
rotas.get("/voluntarios", voluntarioController.list);
//visualizar 1 usuario pelo id
rotas.get("/voluntarios/:id",voluntarioController.find);
//criar
rotas.post("/voluntarios",voluntarioController.create);
//atualizar
rotas.put("/voluntarios/:id",voluntarioController.edit);
//delete
rotas.delete("/voluntarios/:id",voluntarioController.delete);

export default rotas;