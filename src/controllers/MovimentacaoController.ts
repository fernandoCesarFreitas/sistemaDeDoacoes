import { CdItem } from "./../models/Cd_item";
import { Movimentacao } from "../models/Movimentacao";
import { Request, Response } from "express";
import { CD } from "../models/Cds";
import { Item } from "../models/Item";
import PromptSync from "prompt-sync";
import { Pessoas } from "../models/Pessoas";
import { EntityRepository, Repository } from "typeorm";
let cdItem = new CdItem();
let movimentacao = new Movimentacao();
const prompt = PromptSync();

export class MovimentacaoContrller {
  async list(req: Request, res: Response): Promise<Response> {
    let nome = req.query.nome;

    let movimentacao: Movimentacao[] = await Movimentacao.find({
      // nome: nome ? ILike(`%${nome}%`):undefined
    }); //aqui na lista nao usamos as {}
    return res.status(200).json(movimentacao);
  }
  // async list() {
  //   return await Movimentacao.find({
  //     relations: ["cdItem", "pessoas"],
  //   });
  // }

  async create(req: Request, res: Response): Promise<Response> {
    try {
        let body = req.body;

        const cd_id = body.cd_id;
        const item_id = body.item_id;
        const quantidadeMovimentacao = body.tipo === "saida" ? -Math.abs(body.quantidade) : Math.abs(body.quantidade);

        // Consulte todos os registros de CdItem que correspondam ao cd_id e item_id
        const cdItems = await CdItem.find({
            where: {
                cd_id: cd_id,
                item_id: item_id,
            },
        });

        // Use o método reduce para calcular a quantidade total
        const quantidadeTotalNoCd = cdItems.reduce((total, cdItem) => {
            return total + cdItem.quantidade;
        }, 0);

        console.log(quantidadeTotalNoCd);

        // Verifique se a quantidadeMovimentacao é maior do que a quantidadeTotalNoCd
        if (body.tipo === "saida" && quantidadeMovimentacao > quantidadeTotalNoCd) {
          return res.status(400).json({ error: "A quantidade informada é maior do que a quantidade disponível no CD." });
        }

        // Crie uma instância de CdItem
        let cdItem = new CdItem();
        cdItem.cd_id = cd_id;
        cdItem.item_id = item_id;
        cdItem.quantidade = quantidadeMovimentacao;

        // Crie uma instância de Movimentacao e defina os campos
        const movimentacao = new Movimentacao();
        movimentacao.tipo = body.tipo;
        movimentacao.quantidade = quantidadeMovimentacao;
        movimentacao.doador = body.doador;
        movimentacao.cdItem = cdItem;
        movimentacao.pessoas_id_pessoas = body.pessoa_id_pessoa;

        // Salve a instância no banco de dados
        await cdItem.save();
        await movimentacao.save();

        return res.status(200).json({ movimentacao, success: "Movimentação criada com sucesso!" });

    } catch (error) {
        console.error("Erro ao criar a movimentação:", error);
        return res.status(500).json({ error: "Erro ao criar a movimentação." });
    }
}


  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let movimentacao: Movimentacao = res.locals.movimentacao;
    console.log(movimentacao);
    let cdItem: CdItem = res.locals.movimentacao;
    console.log("update");
    console.log(body);
    movimentacao.tipo = body.tipo;
    movimentacao.quantidade = body.quantidade;
    movimentacao.doador = body.doador;
    movimentacao.cdItem = body.CdItem;
    movimentacao.pessoas_id_pessoas = body.pessoas_id_pessoas;
    cdItem.cd_id = body.cd_id;
    cdItem.item_id = body.item_id;
    cdItem.quantidade =
      body.tipo === "saida"
        ? -Math.abs(body.quantidade)
        : Math.abs(body.quantidade);
    let pessoa = await Pessoas.findOneBy({
      idPessoa: body.pessoa_id_pessoa,
    });
    let item = await Item.findOneBy({
      id_item: body.item_id,
    });
    let cd = await CD.findOneBy({
      id_CD: body.cd_id,
    });
    if (pessoa && item && cd) {
      movimentacao.pessoas = pessoa;
      cdItem.item_id = item.id_item;
      cdItem.cd_id = cd.id_CD;
      console.log(cdItem);
      console.log(movimentacao);
      await cdItem.save();
      let itemSalvo = await movimentacao.save();

      return res.status(200).json(itemSalvo);
    } else {
      return res.status(404).json({ mensagem: "Movimentacao não encontrada!" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let movimentacao: Movimentacao = res.locals.movimentacao;
    let id: number = await movimentacao.cd_item_idcd_item;
    let cdItem1: CdItem | null = await CdItem.findOneBy({ id });
    await movimentacao.remove();
    if (cdItem1) {
      await cdItem1.remove();
    }
    return res.status(200).json(movimentacao);
  }

  async find(req: Request, res: Response): Promise<Response> {
    let movimentacao: Movimentacao = res.locals.movimentacao;
    return res.status(200).json(movimentacao);
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

  async listarQuantidadeTotalDeItensEmTodosOsCD(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const cdItemRepository = CdItem;

      const query = `
            SELECT
                cd.nome AS nome_cd,
                item.nome AS nome_item,
                SUM(cd_item.quantidade) AS quantidade_total
            FROM
                cd_item
            INNER JOIN
                cd ON cd.id_cd = cd_item.cd_id
            INNER JOIN
                item ON item.id_item = cd_item.item_id
            GROUP BY
                cd.nome, item.nome
        `;

      const result = await cdItemRepository
        .createQueryBuilder("cdItem")
        .select([
          "cd.nome AS nome_cd",
          "item.nome AS nome_item",
          "SUM(cdItem.quantidade) AS quantidade_total",
        ])
        .innerJoin("cdItem.cd", "cd")
        .innerJoin("cdItem.item", "item")
        .groupBy("cd.nome, item.nome")
        .getRawMany();

      if (result.length === 0) {
        console.log("Nenhum item encontrado.");
      } else {
        console.log("Quantidade total de itens em todos os CDs:");

        // Crie um objeto para armazenar os resultados com tipo explícito
        const resultadoFinal: {
          [nomeCD: string]: { [nomeItem: string]: number };
        } = {};

        result.forEach(
          (row: {
            nome_cd: string;
            nome_item: string;
            quantidade_total: number;
          }) => {
            const nomeCD = row.nome_cd;
            const nomeItem = row.nome_item;
            const quantidadeTotal = row.quantidade_total;

            // Verifique se o objeto já contém a chave do CD
            if (!resultadoFinal[nomeCD]) {
              resultadoFinal[nomeCD] = {};
            }

            // Defina a quantidade total para o nome do item no CD atual
            resultadoFinal[nomeCD][nomeItem] = quantidadeTotal;
          }
        );

        return res.status(200).json(resultadoFinal);
      }
    } catch (error) {
      return res.status(404).json({ mensagem: "Movimentacao não encontrada!" });
      console.error(
        "Erro ao listar a quantidade total de itens em todos os CDs:",
        error
      );
    }
    return res.status(404).json({ mensagem: "Movimentacao não encontrada!" });
  }

  async listarQuantidadeTotalDeItensEmTodosOsCDs(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      // Recupere todos os CDs
      const cds = await CD.find();

      if (cds.length === 0) {
        console.log("Nenhum CD encontrado.");
      } else {
        console.log("Quantidade total de itens em todos os CDs:");

        // Inicialize um objeto para armazenar as quantidades totais por item
        const itemQuantidades: { [nome: string]: number } = {};

        // Itere sobre cada CD
        for (const cd of cds) {
          // Recupere os itens associados a este CD
          const cdItems = await CdItem.find({
            where: { id: cd.id_CD },
            relations: ["item"],
          });

          // Calcule a quantidade total de cada item e atualize o objeto de quantidades
          cdItems.forEach((cdItem) => {
            const itemName = cdItem.item.nome;
            if (itemQuantidades[itemName]) {
              itemQuantidades[itemName] += cdItem.quantidade;
            } else {
              itemQuantidades[itemName] = cdItem.quantidade;
            }
          });
        }

        // Exiba as quantidades totais por item
        for (const itemName in itemQuantidades) {
          console.log(
            `Nome: ${itemName}, Quantidade Total: ${itemQuantidades[itemName]}`
          );
          return res
            .status(200)
            .json(
              `Nome: ${itemName}, Quantidade Total: ${itemQuantidades[itemName]}`
            );
        }
      }
    } catch (error) {
      return res.status(404).json({ mensagem: "Movimentacao não encontrada!" });
      console.error(
        "Erro ao listar a quantidade total de itens em todos os CDs:",
        error
      );
    }
    return res.status(404).json({ mensagem: "Movimentacao não encontrada!" });
  }
}
