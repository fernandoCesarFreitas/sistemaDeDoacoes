import { ItemController } from "./../controllers/ItemController";
import { CD } from "./../models/Cds";
import { CdController } from "./../controllers/CdController";
import { MovimentacaoContrller } from "../controllers/MovimentacaoController";
import PromptSync from "prompt-sync";
import { Movimentacao } from "../models/Movimentacao";
import { PessoasController } from "../controllers/PessoasController";
import { Pessoas } from "../models/Pessoas";
import { Item } from "../models/Item";
import { table } from "console";

const prompt = PromptSync();

export class MovimentacoesMenu {
  public controller: MovimentacaoContrller;
  public pController: PessoasController;
  public cdController: CdController;
  public itemController: ItemController;
  public movimentacao: Movimentacao;

  constructor() {
    this.controller = new MovimentacaoContrller();
    this.pController = new PessoasController();
    this.cdController = new CdController();
    this.itemController = new ItemController();
    this.movimentacao = new Movimentacao();
  }

  public show() {
    console.clear();
    console.log("1 - Listar movimentações");
    console.log("2 - Cadastrar nova movimentações");
    console.log("3 - Atualizar movimentação");
    console.log("4 - Excluir movimentação");
    console.log("5 - relatorios");
    console.log("6 - relatorio por cd");
    console.log("7 - todos os cds");
    console.log("0 - Voltar ao menu principal");
  }

  public async execute() {
    let input: string;
    do {
      this.show();
      input = prompt("Selecione a opção desejada: ");
      switch (input) {
        case "1":
          await this.list();
          break;
        case "2":
          await this.create();
          break;
        case "3":
          await this.edit();
          break;
        case "4":
          await this.delete();
          break;
        case "5":
          await this.controller.relatorioCategoria();
          break;
        case "6":
          await this.controller.listarQuantidadeTotalDeItensEmUmCD();
          break;
        case "7":
          await this.controller.listarQuantidadeTotalDeItensEmTodosOsCDs();
          break;
        default:
          console.clear();
          break;
      }
      if (parseInt(input) != 0) {
        prompt("presione qualquer tecla para continuar");
      }
    } while (parseInt(input) != 0);
  }

  private async list(): Promise<void> {
    let movimentacoes = await this.controller.list();
    console.log(movimentacoes);
    console.table(movimentacoes);
  }

  private async create(): Promise<void> {
    let anonimo: string = "Anônimo";
    let beneficiario: number | null = null;
    let doador: string | null = null;

    let tipo: string = prompt(
      "Tipo de movimentação:\n[D] - Efetuar doação\n[R] - Receber doação:\n"
    ).toUpperCase();

    if (tipo == "R") {
      let pessoas: Pessoas[] = await this.pController.list();
      console.table(pessoas);

      while (beneficiario == null) {
        let beneficiarioId: number = Number(
          prompt(
            "Informe o ID da pessoa que irá receber a doação (ou 0 para cancelar):"
          )
        );

        if (beneficiarioId == 0) {
          console.log("Operação de criação de movimentação cancelada.");
          return;
        }

        let pessoa: Pessoas | null = await this.pController.find(
          beneficiarioId
        );
        if (pessoa) {
          beneficiario = pessoa.idPessoa;
        } else {
          console.log(
            "ID de beneficiário não encontrado. Tente novamente ou pressione 0 para cancelar."
          );
        }
      }
    } else {
      doador =
        prompt(
          "Informe o nome do doador (ou pressione Enter para Anônimo): "
        ) || anonimo;
    }

    let cds: CD[] = await this.cdController.list();
    console.table(cds);

    let cdId: number = Number(
      prompt(
        "Informe o ID do CD que será destinado à doação (ou 0 para cancelar): "
      )
    );

    if (cdId == 0) {
      console.log("Operação de criação de movimentação cancelada.");
      return;
    }

    let cd: CD | null = await this.cdController.find(cdId);
    if (!cd) {
      console.log(
        "ID de CD não encontrado. Encerrando a criação de movimentação."
      );
      return;
    }

    let itens: Item[] = await this.itemController.list();
    console.table(itens);

    let idItem: number = Number(prompt("Informe o ID do item: "));

    let item: Item | null = await this.itemController.find(idItem);
    if (!item) {
      console.log(
        "ID de item não encontrado. Encerrando a criação de movimentação."
      );
      return;
    }

    let quantidade: number = Number(prompt("Quantidade: "));

    try {
      let m: Movimentacao = await this.controller.create(
        tipo,
        quantidade,
        doador,
        beneficiario,
        cd,
        item
      );

      console.log(`Movimentação ID #${m.id_movimentacao} criada com sucesso!`);
    } catch (error) {
      console.error("Erro ao criar a movimentação:", error);
    }
  }






  private async edit(): Promise<void> {
    let anonimo: string = "Anônimo";
    let beneficiario: number | null = null;
    let doador: string | null = null;
    await this.list();
    let id: number = Number(prompt("Informe o ID da movimentação:"));
    let movimentacao: Movimentacao | null = await this.controller.find(id);

    if (movimentacao) {
      let tipo = prompt(
        `Tipo de movimentação:\n[D] - Efetuar doação\n[R] - Receber doação:\n" ${movimentacao.tipo}`,
        movimentacao.tipo
      ).toLocaleUpperCase();
      let quantidade = Number(
        prompt(
          `Quantidade ${movimentacao.quantidade}`,
          String(movimentacao.quantidade)
        )
      );
      if (tipo == "R") {
        let beneficiarioId: number = Number(
          prompt(
            `Informe o nome do doador (ou pressione Enter para ${movimentacao.pessoas_id_pessoas}): `, String(movimentacao.pessoas_id_pessoas)
          )
        );

        if (beneficiarioId == 0) {
          console.log("Operação de criação de movimentação cancelada.");
          return;
        }

        let pessoa: Pessoas | null = await this.pController.find(
          beneficiarioId
        );
        if (pessoa) {
          beneficiario = pessoa.idPessoa;
        } else {
          console.log(
            "ID de beneficiário não encontrado. Tente novamente ou pressione 0 para cancelar."
          );
        }
      } else {
        doador = prompt(
          `Informe o nome do doador (ou pressione Enter para ${movimentacao.doador}): `,
          movimentacao.doador
        );
      }

      let cds: CD[] = await this.cdController.list();
      console.table(cds);

      let cdId: number = Number(
        prompt(
          `Informe o ID do CD que será destinado à doação (ou 0 para cancelar): `
        )
      );
  
      if (cdId == 0) {
        console.log("Operação de criação de movimentação cancelada.");
        return;
      }
  
      let cd: CD | null = await this.cdController.find(cdId);
      if (!cd) {
        console.log(
          "ID de CD não encontrado. Encerrando a criação de movimentação."
        );
        return;
      }
  
      let itens: Item[] = await this.itemController.list();
      console.table(itens);
  
      let idItem: number = Number(prompt("Informe o ID do item: "));
  
      let item: Item | null = await this.itemController.find(idItem);
      if (!item) {
        console.log(
          "ID de item não encontrado. Encerrando a criação de movimentação."
        );
        return;
      }
  
     movimentacao = await this.controller.edit(
        movimentacao,
        tipo,
        quantidade,
        doador,
        beneficiario,
        cd,
        item,
      );
      console.log(
        `Movimentação ID #${movimentacao.id_movimentacao} atualizado com sucesso!`
      );
    } else {
      console.log("Movimentação não encontrado");
    }
    console.log("Movimentação atualizada com sucesso!");
  }

  
  private async delete(): Promise<void> {
    await this.list();
    let id: number = Number(prompt("Informe o ID da movimentação:"));
    let movimentacao: Movimentacao | null = await this.controller.find(id);

    if (movimentacao) {
      let confirmacao:string =prompt('Deseja realmente excluir essa movimentação?[s/n]').toUpperCase();
      if(confirmacao == 'S'){
        await this.controller.delete(movimentacao);
      }
      console.log(`Movimentação ID#${id} excluída com sucesso!`);
    } else {
      console.log("Movimentação não encontrada");
    }
  }
}
