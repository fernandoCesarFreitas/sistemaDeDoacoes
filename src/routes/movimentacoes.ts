import { Router, Request, Response, NextFunction } from "express";
import { MovimentacaoContrller } from "../controllers/MovimentacaoController";
import * as yup from "yup";
import { Movimentacao } from "../models/Movimentacao";
let movimentacaoController: MovimentacaoContrller = new MovimentacaoContrller();

async function validarPayload(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    let schema = yup.object({
      tipo: yup.string().min(3).max(255).required(),
      quantidade:yup.number().integer().required(),
      doador: yup.string().min(3).max(255).nullable(),
      pessoa_id_pessoa: yup.number().integer().nullable(),
      item_id: yup.number().integer(),
      cd_id: yup.number().integer(),
      cd_item_idcd_item: yup.number().integer(),
    });
    let payload = req.body;
    console.log(payload)
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
  
    let movimentacao: Movimentacao | null = await Movimentacao.findOneBy({ id_movimentacao:id });
  
    if (!movimentacao) {
      return res.status(422).json({ error: "Movimentação não encontrada!" });
    }
    res.locals.movimentacao = movimentacao;
  
    return next();
  }


let rotas:Router = Router();
//listar
rotas.get("/movimentacao", movimentacaoController.list);
//visualizar 1 usuario pelo id
rotas.get("/movimentacao/:id",validar,movimentacaoController.find);
//criar
rotas.post("/movimentacao",validarPayload,movimentacaoController.create);
//atualizar
rotas.put("/movimentacao/:id",validar,validarPayload,movimentacaoController.update);
//delete
rotas.delete("/movimentacao/:id",validar,movimentacaoController.delete);

export default rotas;