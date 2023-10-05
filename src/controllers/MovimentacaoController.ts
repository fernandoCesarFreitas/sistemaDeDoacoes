import { Movimentacao } from "../models/Movimentacao";
import { Request, Response } from "express";
import { CdItem } from "../models/Cd_item";
import { CD } from "../models/Cds";
import { Item } from "../models/Item";
import PromptSync from "prompt-sync";
let cdItem = new CdItem();
let movimentacao = new Movimentacao();
const prompt = PromptSync();

export class MovimentacaoContrller {
  async list(req: Request, res: Response): Promise<Response> {
    let nome = req.query.nome;

    let movimentacao: Movimentacao[] = await Movimentacao.find({
      relations:['cdItem', 'pessoas']
      // nome: nome ? ILike(`%${nome}%`):undefined
    }); //aqui na lista nao usamos as {}
    console.log(movimentacao)
    return res.status(200).json(movimentacao);
  }
  // async list() {
  //   return await Movimentacao.find({
  //     relations: ["cdItem", "pessoas"],
  //   });
  // }

  async create(
    tipo: string,
    quantidade: number,
    doador: string | null,
    beneficiarioId: number | null,
    idCd: CD,
    idItem: Item
  ): Promise<Movimentacao> {
    // fizemos desta forma para garantir que sera criado uma nova instancia toda vez que for criado uma nova movimentação
    let cdItem = new CdItem();
    let movimentacao = new Movimentacao();

    //uso para calcular a quantidade total de itens
    let cdItems = await CdItem.find({ where: { cd: { id_CD: idCd.id_CD } } });
    let quantidadeTotal = cdItems.reduce(
      (total, cdItem) => total + cdItem.quantidade,
      0
    );
    cdItem.cd = idCd;
    cdItem.item = idItem;
    cdItem.quantidade = 0;
    movimentacao.tipo = tipo;
    movimentacao.cdItem = cdItem;
    //se tido for D entao atribuimos quantidade +
    if (tipo == "D") {
      quantidadeTotal += quantidade;
      cdItem.quantidade = quantidade;
      movimentacao.quantidade = quantidade;
    }
    //se tido for R entao atribuimos quantidade -
    if (tipo == "R") {
      quantidadeTotal -= quantidade;
      if (quantidadeTotal < 0) {
        throw new Error(
          "Quantidade indicada para doação maior que a quantidade disponivel"
        );
      } else {
        cdItem.quantidade = quantidade * -1;
        movimentacao.quantidade = quantidade * -1;
      }
    }
    // se doador vier com algum valor atribuido
    if (doador != null) {
      movimentacao.doador = doador;
    }
    // se beneficiario vier com algum valor atribuido
    if (beneficiarioId != null) {
      movimentacao.pessoas_id_pessoas = beneficiarioId;
    }

    await cdItem.save();

    await movimentacao.save();

    return movimentacao;
  }

  async find(id_movimentacao: number) {
    return await Movimentacao.findOneBy({ id_movimentacao });
  }

  async edit(
    movimentacao: Movimentacao,
    tipo: string,
    quantidade: number,
    doador: string | null,
    beneficiarioId: number | null,
    idCd: CD,
    idItem: Item
  ): Promise<Movimentacao> {
    let cdItems = await CdItem.find({ where: { cd: { id_CD: idCd.id_CD } } });
    let quantidadeTotal = cdItems.reduce(
      (total, cdItem) => total + cdItem.quantidade,
      0
    );
    let id: number = await movimentacao.cd_item_idcd_item;
    let cdItem = await movimentacao.cdItem;

    let cdItem1: CdItem | null = await CdItem.findOneBy({ id });

    if (cdItem1) {
      cdItem1.cd = idCd;
      cdItem1.item = idItem;
    }

    if (!cdItem1) {
      throw new Error("CD_Item associado não encontrado");
    }

    if (tipo == "D") {
      quantidadeTotal += quantidade;
      cdItem1.quantidade = quantidade;
      movimentacao.quantidade = quantidade;
    }

    if (tipo == "R") {
      quantidadeTotal -= quantidade;
      if (quantidadeTotal < 0) {
        throw new Error(
          "Quantidade indicada para doação maior que a quantidade disponível"
        );
      } else {
        cdItem1.quantidade = quantidade * -1;
        movimentacao.quantidade = quantidade * -1;
      }
    }

    movimentacao.tipo = tipo;
    movimentacao.quantidade = quantidade;

    if (doador != null) {
      movimentacao.doador = doador;
    }

    if (beneficiarioId != null) {
      movimentacao.pessoas_id_pessoas = beneficiarioId;
    }

    // Salve as alterações no cd_item e na movimentação
    await cdItem1.save();
    await movimentacao.save();

    return movimentacao;
  }

  async delete(movimentacao: Movimentacao): Promise<void> {
    let id: number = await movimentacao.cd_item_idcd_item;
    let cdItem1: CdItem | null = await CdItem.findOneBy({ id });
    await movimentacao.remove();
    if (cdItem1) 
    await cdItem1.remove();
  }

  async relatorioCategoria() {
    let cd2 = Number(prompt("Informe ID do CD que deseja listar: "));

    try {
      // Verifique se o CD com o ID especificado existe
      const cd = await CD.findOne({ where: { id_CD: cd2 } });

      if (cd) {
        // Encontre todos os itens associados a este CD
        let itensAssociados = await CdItem.find({
          where: {
            cd: {
              id_CD: cd2,
            },
          },
          relations: ["item"], // Carregue a relação "item" para obter detalhes do item
        });

        if (itensAssociados.length === 0) {
          console.log(`Nenhum item associado ao CD #${cd2}.`);
        } else {
          console.log(`Itens associados ao CD #${cd2}:`);
          console.table(
            itensAssociados.map((cdItem) => ({
              Item: cdItem.item.nome, // Substitua pelo nome do campo de nome do item
              Quantidade: cdItem.quantidade,
            }))
          );
        }
      } else {
        console.log(`CD com ID ${cd2} não encontrado.`);
      }
    } catch (error) {
      console.error("Erro ao gerar o relatório:", error);
    }

    try {
      // Encontre todos os CdItems associados a este CD
      let cdItems = await CdItem.find({
        where: {
          cd: {
            id_CD: cd2,
          },
        },
        relations: ["item"], // Carregue a relação "item" para obter detalhes do item
      });

      if (cdItems.length === 0) {
        console.log(`O CD com ID ${cd2} não possui nenhum item associado.`);
      } else {
        console.log(`Itens no CD com ID ${cd2}:`);
        cdItems.forEach((cdItem) => {
          console.log(
            `Nome do Item: ${cdItem.item.nome}, Quantidade: ${cdItem.quantidade}`
          );
        });
      }
    } catch (error) {
      console.error(
        "Erro ao calcular a quantidade total de itens no CD:",
        error
      );
    }
  }

  async listarQuantidadeTotalDeItensEmUmCD() {
    try {
      let cdId: number = Number(prompt("Informe ID do CD que deseja listar: "));
      const cdItems = await CdItem.find({
        where: { cd_id: cdId },
        relations: ["item"], // Certifique-se de que a relação "item" esteja definida na entidade CdItem
      });

      if (cdItems.length === 0) {
        console.log(`Nenhum item encontrado no CD #${cdId}.`);
      } else {
        console.log(`Quantidade total de itens no CD #${cdId}:`);
        const itemQuantidades: { [nome: string]: number } = {};

        cdItems.forEach((cdItem) => {
          const itemName = cdItem.item.nome;
          if (itemQuantidades[itemName]) {
            itemQuantidades[itemName] += cdItem.quantidade;
          } else {
            itemQuantidades[itemName] = cdItem.quantidade;
          }
        });

        for (const itemName in itemQuantidades) {
          console.log(
            `Nome: ${itemName}, Quantidade Total: ${itemQuantidades[itemName]}`
          );
        }
      }
    } catch (error) {
      console.error(
        `Erro ao listar a quantidade total de itens no CD #:`,
        error
      );
    }
  }

  async listarQuantidadeTotalDeItensEmTodosOsCDs() {
    try {
      const cdItemRepository = CdItem;

      const query = `
      SELECT
        item.nome AS nome_item,
        SUM(cd_item.quantidade) AS quantidade_total
      FROM
        cd_item
      INNER JOIN
        item ON item.id_item = cd_item.item_id
      GROUP BY
        item.nome
    `;

      const result = await cdItemRepository
        .createQueryBuilder("cdItem")
        .select([
          "item.nome AS nome_item",
          "SUM(cdItem.quantidade) AS quantidade_total",
        ])
        .innerJoin("cdItem.item", "item")
        .groupBy("item.nome")
        .getRawMany();

      if (result.length === 0) {
        console.log("Nenhum item encontrado.");
      } else {
        console.log("Quantidade total de itens em todos os CDs:");
        result.forEach(
          (row: { nome_item: string; quantidade_total: number }) => {
            console.log(
              `Nome: ${row.nome_item}, Quantidade Total: ${row.quantidade_total}`
            );
          }
        );
      }
    } catch (error) {
      console.error(
        "Erro ao listar a quantidade total de itens em todos os CDs:",
        error
      );
    }
  }
}
