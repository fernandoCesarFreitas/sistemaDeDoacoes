import { Router } from "express";
import { MovimentacaoContrller } from "../controllers/MovimentacaoController";
let movimentacaoController: MovimentacaoContrller = new MovimentacaoContrller();

let rotas:Router = Router();
//listar
rotas.get("/movimentacao", movimentacaoController.list);
//visualizar 1 usuario pelo id
rotas.get("/movimentacao/:id",movimentacaoController.find);
//criar
// rotas.post("/movimentacao",movimentacaoController.create);
//atualizar
// rotas.put("/movimentacao/:id",movimentacaoController.edit);
//delete
rotas.delete("/movimentacao/:id",movimentacaoController.delete);

export default rotas;