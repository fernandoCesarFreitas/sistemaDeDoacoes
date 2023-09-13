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
    console.log("1 - Listar categorias");
    console.log("2 - Cadastrar nova categoria");
    console.log("3 - Atualizar categoria");
    console.log("4 - Excluir categoria");
  }

  public async execute(input: string | null) {
    switch (input) {
      case "5":
        await this.list();
        break;
      case "6":
        await this.create();
        break;
      case "7":
        await this.edit();
        break;
      case "8":
        await this.delete();
        break;
    }
  }

  private async list(): Promise<void> {
    let categorias = await this.controller.list();
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
      let descricao = prompt(`Descrição ${categoria.descricao}`, categoria.descricao);

      categoria = await this.controller.edit(categoria, descricao);
      console.log(`Cliente ID #${categoria.id_categoria} atualizado com sucesso!`)
    } else {
      console.log('Cliente não encontrado')
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
      console.log('Cliente não encontrado');
    }
  }
}
