import { Router } from "express";
import { CategoriasController } from "../controllers/CategoriasController";
let categoriaController: CategoriasController = new CategoriasController();

let rotas:Router = Router();
//listar
rotas.get("/categorias", categoriaController.list);
//visualizar 1 usuario pelo id
rotas.get("/categorias/:id",categoriaController.find);
//criar
rotas.post("/categorias",categoriaController.create);
//atualizar
// rotas.put("/categorias/:id",categoriaController.edit);
//delete
rotas.delete("/categorias/:id",categoriaController.delete);

export default rotas;