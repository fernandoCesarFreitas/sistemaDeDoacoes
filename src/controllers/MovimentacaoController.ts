import { Movimentacao } from "../models/Movimentacao";
import { Pessoas } from "../models/Pessoas";
import { CdItem } from "../models/Cd_item";

export class MovimentacaoContrller {
  async list() {
    return await Movimentacao.find();
  }

  async create(tipo: string, quantidade: number, doador: string) {
    return await Movimentacao.create({
      tipo,
      quantidade,
      doador,
    }).save();
  }

  async find(id_movimentacao: number) {
    return await Movimentacao.findOneBy({ id_movimentacao });
  }

  async edit(
    movimentacao: Movimentacao,
    data_Hora: string,
    tipo: string,
    quantidade: number,
    doador: string
  ) {
    movimentacao.data_Hora = data_Hora;
    movimentacao.tipo = tipo;
    movimentacao.quantidade = quantidade;
    movimentacao.doador = doador;
    await movimentacao.save();

    return movimentacao;
  }

  async delete(movimentacao: Movimentacao): Promise<void> {
    await movimentacao.remove();
  }
}
