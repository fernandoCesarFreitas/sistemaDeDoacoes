import { Movimentacao } from "../models/Movimentacao";
import { Pessoas } from "../models/Pessoas";
import { CdItem } from "../models/Cd_item";
// import { getRepository } from "typeorm";
import { CD } from "../models/Cds";
import { Item } from "../models/Item";
let movimentacao: Movimentacao = new Movimentacao();
export class MovimentacaoContrller {
  async list() {
    return await Movimentacao.find();
  }

  // private movimentacaoRepository = getRepository(Movimentacao);

  async create(
    tipo: string,
    quantidade: number,
    doador: string,
    idCd: CD,
    idItem: Item
  ): Promise<Movimentacao> {
     const cdItem = new CdItem();
  cdItem.cd = idCd;
  cdItem.item = idItem;
  cdItem.quantidade = quantidade;

   const movimentacao = new Movimentacao();
  movimentacao.tipo = tipo;
  movimentacao.quantidade = quantidade;
  movimentacao.doador = doador;
  movimentacao.cdItem = cdItem;

    // const movimentacao = new Movimentacao();
    // movimentacao.tipo = tipo;
    // movimentacao.quantidade = quantidade;
    // movimentacao.doador = doador;

    // movimentacao.cdItem = new CdItem();

    // movimentacao.cdItem.cd = idCd;
    // movimentacao.cdItem.item = idItem;

    // Você precisa encontrar o Cd e o Item com base nos IDs fornecidos
    // Certifique-se de ajustar a lógica para encontrar esses objetos no seu banco de dados
    // Exemplo:
    // const cd = await this.cdRepository.findOne(idCd);
    // const item = await this.itemRepository.findOne(idItem);

    // Depois de encontrar o Cd e o Item, associe-os ao CdItem e, em seguida, à Movimentacao
    // Certifique-se de ajustar isso de acordo com a estrutura real do seu modelo de dados
    // Exemplo:
    // movimentacao.cdItem = new CdItem();
    // movimentacao.cdItem.cd = cd;
    // movimentacao.cdItem.item = item;

    // Salve a Movimentacao no banco de dados
    await movimentacao.save();

    return movimentacao;
  }

  // async create(
  //   tipo: string,
  //   quantidade: number,
  //   doador: string,
  //   idCds: number,
  //   idItem: number
  // ): Promise<Movimentacao> {
  //   movimentacao.tipo = tipo;
  //   movimentacao.quantidade = quantidade;
  //   movimentacao.doador = doador;
  //   movimentacao.cd_item_idcd_item = idCds;
  //   movimentacao.cd_item_idcd_item = idItem;
  //   // tipo,
  //   // quantidade,
  //   // doador,
  //   await movimentacao.save();
  //   return movimentacao;
  // }

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
