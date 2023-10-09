import { AutenticacaoController } from './../controllers/AutenticacaoController';
import { Router,} from "express";

let autenticacaoController: AutenticacaoController = new AutenticacaoController();
let rotas: Router = Router();


rotas.post('/login',autenticacaoController.login);

export default rotas;