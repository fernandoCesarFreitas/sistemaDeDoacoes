import { CidadesController } from './../controllers/CidadesController';
import { Router } from "express";
let cidadesController: CidadesController = new CidadesController();

let rotas:Router = Router();
//listar
rotas.get("/cidades", cidadesController.list);
//visualizar 1 usuario pelo id
rotas.get("/cidades/:id",cidadesController.find);
//criar
// rotas.post("/cidades",cidadesController.create);
//atualizar
// rotas.put("/cidades/:id",cidadesController.edit);
//delete
rotas.delete("/cidades/:id",cidadesController.delete);

export default rotas;