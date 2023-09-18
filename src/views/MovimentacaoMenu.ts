import { MovimentacaoContrller } from "../controllers/MovimentacaoController";
import PromptSync from "prompt-sync";
import { Movimentacao } from "../models/Movimentacao";
import { Pessoas } from "../models/Pessoas";

const prompt = PromptSync();

export class MovimentacoesMenu {
  public controller: MovimentacaoContrller;

  constructor() {
    this.controller = new MovimentacaoContrller();
  }

  public show() {
    console.clear();
    console.log("1 - Listar movimentações");
    console.log("2 - Cadastrar nova movimentações");
    console.log("3 - Atualizar movimentação");
    console.log("4 - Excluir movimentação");
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
    console.table(movimentacoes);
  }

  private async create(): Promise<void> {
    let data_Hora: string = prompt("Data e hora: ");
    let tipo: string = prompt("Tipo de movimentação: ");
    let quantidade: number = Number(prompt("Categoria: "));
    let doador: string = prompt("Categoria: ", 'Anônimo');

    let m = await this.controller.create(data_Hora, tipo, quantidade, doador);

    console.log(`Beneficiário ID #${m.id_movimentacao} criando com sucesso!`);
  }

  private async edit(): Promise<void> {
    let id: number = Number(prompt("Qual o ID?"));
    let movimentacao: Movimentacao | null = await this.controller.find(id);

    if (movimentacao) {
      let data_hora = prompt(`Data e Hora ${movimentacao.data_Hora}`);
      let tipo = prompt(`Tipo ${movimentacao.tipo}`, movimentacao.tipo);
      let quantidade = Number(prompt(`Quantidade ${movimentacao.quantidade}`));
      let doador = prompt(`Quantidade ${movimentacao.quantidade}`);

      movimentacao = await this.controller.edit(movimentacao, data_hora, tipo, quantidade, doador);
      console.log(
        `Movimentação ID #${movimentacao.id_movimentacao} atualizado com sucesso!`
      );
    } else {
      console.log("Movimentação não encontrado");
    }
    console.log("Movimentação atualizada com sucesso!");
  }

  private async delete(): Promise<void> {
    let id: number = Number(prompt("Qual o ID?"));
    let movimentacao: Movimentacao | null = await this.controller.find(id);

    if (movimentacao) {
      await this.controller.delete(movimentacao);
      console.log(`Movimentação ID#${id} excluído com sucesso!`);
    } else {
      console.log("Movimentação não encontrado");
    }
  }
}
