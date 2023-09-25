import { CategoriasController } from "../controllers/CategoriasController";
import PromptSync from "prompt-sync";
import { Categoria } from "../models/Categorias";

const prompt = PromptSync();

export class CategoriasMenu {
  public controller: CategoriasController;

  constructor() {
    this.controller = new CategoriasController();
  }

  public show() {
    console.clear();
    console.log("1 - Listar categorias");
    console.log("2 - Cadastrar nova categoria");
    console.log("3 - Atualizar categoria");
    console.log("4 - Excluir categoria");
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
    let categorias = await this.controller.list();
    console.log(categorias)
    console.table(categorias);
  }

  private async create(): Promise<void> {
    let categoria: string = prompt("Categoria: ");

    let c = await this.controller.create(categoria);

    console.log(`Beneficiário ID #${c.id_categoria} criando com sucesso!`);
  }

  private async edit(): Promise<void> {
    let id: number = Number(prompt("Qual o ID?"));
    let categoria: Categoria | null = await this.controller.find(id);

    if (categoria) {
      let idcate = prompt(`ID ${categoria.id_categoria}`);
      let descricao = prompt(
        `Descrição ${categoria.descricao}`,
        categoria.descricao
      );

      categoria = await this.controller.edit(categoria, descricao);
      console.log(
        `Cliente ID #${categoria.id_categoria} atualizado com sucesso!`
      );
    } else {
      console.log("Cliente não encontrado");
    }
    console.log("Cliente atualizado com sucesso!");
  }

  private async delete(): Promise<void> {
    let id: number = Number(prompt("Qual o ID?"));

    let categoria: Categoria | null = await this.controller.find(id);
    if (categoria) {
      await this.controller.delete(categoria);
      console.log(`Cliente ID#${id} excluído com sucesso!`);
    } else {
      console.log("Cliente não encontrado");
    }
  }
}
