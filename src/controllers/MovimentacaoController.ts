import { Movimentacao } from "../models/Movimentacao";
import { CdItem } from "../models/Cd_item";
import { CD } from "../models/Cds";
import { Item } from "../models/Item";
import PromptSync from "prompt-sync";
let cdItem = new CdItem();


const prompt = PromptSync();
export class MovimentacaoContrller {
  async list() {
    return await Movimentacao.find({
      relations: ["cdItem", "pessoas"],
    });
  }
  async create(
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
    
    if (!cdItem) {
      cdItem = new CdItem();
      cdItem.cd = idCd;
      cdItem.item = idItem;
      cdItem.quantidade = 0;
      await cdItem.save();
      let movimentacao = new Movimentacao();
      movimentacao.tipo = tipo;
      movimentacao.quantidade = quantidade;
      // movimentacao.pessoas_id_pessoas = beneficiarioId;
      movimentacao.cdItem = cdItem;
      await movimentacao.save();
    }

    // console.log(cdItems);
    console.log(quantidadeTotal + "quantidade total");
    cdItem.cd = idCd;
    cdItem.item = idItem;
    if (tipo == "D") {
      cdItem.cd = idCd;
      cdItem.item = idItem;
      cdItem.quantidade = 0;
      await cdItem.save();
      quantidadeTotal += quantidade;
      console.log('quantidade dentro D'+quantidadeTotal)
      cdItem.quantidade = quantidadeTotal;
      await cdItem.save();
      let movimentacao = new Movimentacao();
      movimentacao.tipo = tipo;
      movimentacao.quantidade = quantidade;
      movimentacao.cdItem = cdItem;
      await movimentacao.save();
    
    }


    if (tipo == "R") {
      cdItem.cd = idCd;
      cdItem.item = idItem;
      quantidadeTotal -= quantidade;
      console.log('quantidade total dentro R'+quantidadeTotal)
      cdItem.quantidade = 0;
      // console.log(
      //    quantidade + "quantidade total dentro do R"
      // );
      await cdItem.save();
      console.log(cdItem.quantidade+ 'antes de salvar no bd')
      cdItem.quantidade = quantidadeTotal;
      await cdItem.save();
      await console.log(
        cdItem.quantidade + "quantidade que esta sendo salva no db cd_item.quantidade no R"
        
      );
      let movimentacao = new Movimentacao();
      movimentacao.tipo = tipo;
      movimentacao.quantidade = quantidade * -1;
      movimentacao.cdItem = cdItem;
      await movimentacao.save();
    }

   

    if (doador !== null) {
      movimentacao.doador = doador;
    }

    if (beneficiarioId !== null) {
      movimentacao.pessoas_id_pessoas = beneficiarioId;
    }

    // Salvar os objetos
    // await cdItem.save();

    // Encontre o CD_Item associado ao CD e ao Item
    if (!cdItem.cd) {
      throw new Error("CD_Item associado não encontrado");
    }

    // // Atualizar o total das quantidades no CD_Item
    // if (tipo === "D") {
    //   // Se for uma doação, adicione a quantidade ao CD_Item
    //   cdItem.quantidade += quantidade;
    // } else if (tipo === "R") {
    //   // Se for uma recepção, subtraia a quantidade do CD_Item
    //   cdItem.quantidade -= quantidade;
    //   // Certifique-se de que a quantidade não fique negativa
    // if (cdItem.quantidade < 0) {
    //   throw new Error("Quantidade no CD_Item não pode ser negativa");
    // }
    // }

    // Salvar as alterações no CD_Item
    

    return movimentacao;
  }

  // async create(
  //   tipo: string,
  //   quantidade: number,
  //   doador: string,
  //   cd: CD,
  //   item: Item
  // ): Promise<Movimentacao> {
  //   const cdItem = new CdItem();
  //   cdItem.cd = cd;
  //   cdItem.item = item;
  //   cdItem.quantidade = quantidade;

  //   const movimentacao = new Movimentacao();
  //   movimentacao.tipo = tipo;
  //   movimentacao.quantidade = quantidade;
  //   movimentacao.doador = doador;
  //   movimentacao.cdItem = cdItem;

  //   try {
  //     await cdItem.save();
  //     await movimentacao.save();

  //     return movimentacao;
  //   } catch (error) {
  //     throw error;
  //   }
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
