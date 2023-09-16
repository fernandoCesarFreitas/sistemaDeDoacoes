import { PessoasController } from "../controllers/PessoasController";
import PromptSync from "prompt-sync";
import { Pessoas } from "../models/Pessoas";
import { CidadesController } from "../controllers/CidadesController";
import { Cidade } from "../models/Cidades";

const prompt = PromptSync();

export class PessoasMenu {
  public controller: PessoasController;
  public cController: CidadesController;

  constructor() {
    this.controller = new PessoasController();
    this.cController = new CidadesController();
  }

  public show() {
    console.clear();
    console.log("1 - Listar beneficiários");
    console.log("2 - Cadastrar novo beneficiário");
    console.log("3 - Atualizar beneficiário");
    console.log("4 - Excluir beneficiário");
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
    let pessoas = await this.controller.list();
    console.table(pessoas);
  }

  private async create(): Promise<void> {
    let nome: string = prompt("Nome: ");
    let endereco: string = prompt("Endereço: ");

    let listaCidades = await this.cController.list();
    console.table(listaCidades);

    let cidadeId: number;

    let cidadeEncontrada = false;

    do {
      cidadeId = Number(prompt("ID da Cidade: "));
      let cidade: Cidade | null = await Cidade.findOneBy({
        id_cidade: cidadeId,
      });

      if (cidade) {
        cidadeEncontrada = true;
        try {
          let pessoa: Pessoas = await this.controller.create(
            nome,
            endereco,
            cidade.id_cidade
          );
          console.log(`Pessoa ID #${pessoa.idPessoa} criada com sucesso!`);
        } catch (error: any) {
          console.log(error.message);
        }
      } else {
        console.log(
          "Cidade não encontrada. Tente novamente ou digite 0 para sair."
        );
        cidadeId = Number(prompt("ID da Cidade (digite 0 para sair): "));
        if (cidadeId === 0) {
          break; // Sai do loop se o usuário digitar 0
        }
      }
    } while (!cidadeEncontrada);

    console.log("Pressione qualquer tecla para continuar");
  }

  private async edit(): Promise<void> {
    let id: number = Number(prompt("Qual o ID?"));
    let pessoa: Pessoas | null = await this.controller.find(id);

    if (pessoa) {
      let name = prompt(`Nome ${pessoa.nome}`, pessoa.nome);
      let endereco = prompt(`Endereço ${pessoa.endereco}`, pessoa.endereco);

      pessoa = await this.controller.edit(pessoa, name, endereco);
      console.log(`Pessoa ID #${pessoa.idPessoa} atualizada com sucesso!`);
    } else {
      console.log("Pessoa não encontrado");
    }
    console.log("Pessoa atualizado com sucesso!");
  }

  private async delete(): Promise<void> {
    let id: number = Number(prompt("Qual o ID?"));

    let pessoa: Pessoas | null = await this.controller.find(id);
    if (pessoa) {
      await this.controller.delete(pessoa);
      console.log(`Pessoa ID#${id} deletada com sucesso!`);
    } else {
      console.log("Pessoa não encontrada");
    }
  }
}
