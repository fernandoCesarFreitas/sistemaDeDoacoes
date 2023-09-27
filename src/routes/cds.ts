import { Router } from "express";
import { CdController } from "../controllers/CdController";
let cdController: CdController = new CdController();

let rotas:Router = Router();
//listar
rotas.get("/cds", cdController.list);
//visualizar 1 usuario pelo id
rotas.get("/cds/:id",cdController.find);
//criar
// rotas.post("/cds",cdController.create);
//atualizar
// rotas.put("/cds/:id",cdController.edit);
//delete
rotas.delete("/cds/:id",cdController.delete);

export default rotas;