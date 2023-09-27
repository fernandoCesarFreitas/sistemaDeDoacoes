import { Router } from "express";
import { PessoasController } from "../controllers/PessoasController";
let pessoasController: PessoasController = new PessoasController();

let rotas:Router = Router();
//listar
rotas.get("/pessoas", pessoasController.list);
//visualizar 1 usuario pelo id
rotas.get("/pessoas/:id",pessoasController.find);
//criar
// rotas.post("/pessoas",pessoasController.create);
//atualizar
// rotas.put("/pessoas/:id",pessoasController.edit);
//delete
rotas.delete("/pessoas/:id",pessoasController.delete);

export default rotas;