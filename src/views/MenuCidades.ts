import PromptSync from "prompt-sync";
const prompt = PromptSync();
import { CidadesController } from "../controllers/CidadesController";
import { Cidade } from "../models/Cidades";

export class MenuCidade {
  public controller: CidadesController;
  constructor() {
    this.controller = new CidadesController();
  }
  async menuCidade(): Promise<void> {
    let opcao: number = 0;
    do {
      console.clear();
      console.log(
        "[1]- Listar cidades\n" +
          "[2]- Cadastrar nova cidade \n" +
          "[3]- Editar cidade \n" +
          "[4]- Deletar cidade \n" +
          "[0]- Voltar ao menu principal"
      );
      opcao = Number(prompt("Selecione a opção desejada: "));
      switch (opcao) {
        case 1:
          await this.list();
          break;
        case 2:
          await this.create();
          break;
        case 3:
          await this.edit();
          break;
        case 4:
          await this.delete();
          break;
        default:
          console.clear();
          break;
      }
      if (opcao != 0) {
        prompt("presione qualquer tecla para continuar");
      }
    } while (opcao != 0);
  }

  private async list(): Promise<void> {
    let cidade: Cidade[] = await this.controller.list();
    console.table(cidade);
  }

  private async create(): Promise<void> {
    // await this.list();
    let nome: string = prompt("Nome: ");
    let situacao: string = "A";

    let cidade: Cidade = await this.controller.create(nome, situacao);
    console.log(`Categoria #${cidade.id_cidade} criada com sucesso!`);
  }

  private async edit(): Promise<void> {
    await this.list();
    let id: number = Number(prompt("Qual o ID da cidade? "));
    let cidade: Cidade | null = await this.controller.find(id);
    if (cidade) {
      let nome = prompt(`nome (${cidade.nome}): `, cidade.nome);
      let situacao = prompt(
        `Situação (${cidade.situacao}): [A]- Ativo / [I]- Inativo`,
        cidade.situacao
      ).toUpperCase();
      if (situacao == "A" || situacao == "I") {
        cidade = await this.controller.edit(cidade, nome, situacao);
        console.log(`Categoria #${cidade.id_cidade} criada com sucesso!`);
      } else {
        console.log("Dados Incorretos [A] - Ativo / [I] - Inativo");
      }
    }
  }

  private async delete(): Promise<void> {
    await this.list();
    let id: number = Number(prompt("Qual o id: "));
    let cidade: Cidade | null = await this.controller.find(id);
    if (cidade) {
      await this.controller.delete(cidade);
      console.log(`Cidade #${id} deletada com sucesso`);
    } else {
      console.log("Cidade não encontrada");
    }
  }
}
