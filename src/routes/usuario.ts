import { Router } from "express";
import { VoluntarioController } from "../controllers/VoluntariosController";
let voluntarioController: VoluntarioController = new UsuarioController();

let rotas:Router = Router();
//listar
rotas.get("/usuarios", voluntarioController.list);
//visualizar 1 usuario pelo id
rotas.get("/usuarios/:id",voluntarioController.find);
//criar
rotas.post("/usuarios",voluntarioController.create);
//atualizar
rotas.put("/usuarios/:id",voluntarioController.edit);
//delete
rotas.delete("/usuarios/:id",voluntarioController.delete);

export default rotas;