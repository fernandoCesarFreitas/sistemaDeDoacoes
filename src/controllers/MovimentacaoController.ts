import { CdItem } from './../models/Cd_item';
import { Movimentacao } from "../models/Movimentacao";
import { Request, Response } from "express";
import { CD } from "../models/Cds";
import { Item } from "../models/Item";
import PromptSync from "prompt-sync";
import { Pessoas } from '../models/Pessoas';
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
    let body = req.body;
    console.log('criar')
    console.log(body)
    let cdItem = new CdItem();
    const movimentacao = new Movimentacao();
    movimentacao.tipo = body.tipo;
    movimentacao.quantidade = body.quantidade;
    movimentacao.doador = body.doador;
    movimentacao.cdItem = cdItem;
    movimentacao.pessoas_id_pessoas = body.pessoa_id_pessoa;
    cdItem.cd_id = body.cd_id;
    cdItem.item_id = body.item_id;
    cdItem.quantidade =
      body.tipo === "saida"
        ? -Math.abs(body.quantidade)
        : Math.abs(body.quantidade);
    console.log(movimentacao);
    console.log(cdItem);
    // Salve a instância no banco de dados
    await cdItem.save();
    await movimentacao.save();

    return res.status(200).json(movimentacao);
  }

    
  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let movimentacao: Movimentacao = res.locals.movimentacao;
    console.log(movimentacao)
    let cdItem : CdItem =  res.locals.movimentacao
    console.log("update");
    console.log(body);
    movimentacao.tipo = body.tipo;
    movimentacao.quantidade= body.quantidade;
    movimentacao.doador =  body.doador;
    movimentacao.cdItem = body.CdItem;
    movimentacao.pessoas_id_pessoas =  body.pessoas_id_pessoas;
    cdItem.cd_id = body.cd_id;
    cdItem.item_id = body.item_id;
    cdItem.quantidade =
      body.tipo === "saida"
        ? -Math.abs(body.quantidade)
        : Math.abs(body.quantidade);
    let pessoa = await Pessoas.findOneBy({
      idPessoa: body.pessoa_id_pessoa
    });
    let item = await Item.findOneBy({
      id_item: body.item_id
    });
    let cd = await CD.findOneBy({
      id_CD: body.cd_id
    });
    if(pessoa && item && cd){
      movimentacao.pessoas = pessoa;
      cdItem.item_id = item.id_item;
      cdItem.cd_id = cd.id_CD;
      console.log(cdItem)
      console.log(movimentacao)
      await cdItem.save();
      let itemSalvo = await movimentacao.save();

      return res.status(200).json(itemSalvo);
    }else{
      return res.status(404).json({mensagem:'Movimentacao não encontrada!'});
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
