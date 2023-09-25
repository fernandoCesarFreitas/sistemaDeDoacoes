import { ItemController } from "../controllers/ItemController";
import { CategoriasController } from "../controllers/CategoriasController";
import PromptSync from "prompt-sync";
const prompt = PromptSync();
import { CD } from "../models/Cds";
import { Cidade } from "../models/Cidades";
import { Item } from "../models/Item";
import { Categoria } from "../models/Categorias";

export class MenuItem {
  public controller: ItemController;
  public cController: CategoriasController;
  constructor() {
    this.controller = new ItemController();
    this.cController = new CategoriasController();
  }
  async menuItens(): Promise<void> {
    let opcao: number = 0;
    do {
      console.clear();
      console.log(
        "[1]- Listar Itens\n" +
          "[2]- Cadastrar novo Item \n" +
          "[3]- Editar Item \n" +
          "[4]- Deletar Item \n" +
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
    let item: Item[] = await this.controller.list();
    console.log(item)
    console.table(item);
  }

  private async create(): Promise<void> {
    let nome: string = prompt("Nome: ");
    let situacao: string = "A";

    let listaCategorias = await this.cController.list();
    console.table(listaCategorias);

    let categoriaId: number = Number(prompt("Id Categoria: "));
    let catId: Categoria | null = await Categoria.findOneBy({
      id_categoria: categoriaId,
    });
    if (!catId) {
      throw new Error("Categoria não encontrada!");
    }

    try {
      let item: Item = await this.controller.create(
        nome,
        situacao,
        catId.id_categoria
      );
      console.log(`Categoria ID #${item.id_item} criada com sucesso!`);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  private async edit(): Promise<void> {
    await this.list();
    let id: number = Number(prompt("Qual o ID do item? "));
    let item: Item | null = await this.controller.find(id);
    if (item) {
      let nome = prompt(`nome (${item.nome}): `, item.nome);
      let situacao = prompt(
        `Situação (${item.situacao}): [A]- Ativo / [I]- Inativo`,
        item.situacao
      ).toUpperCase();
      if (situacao == "A" || situacao == "I") {
        item = await this.controller.edit(item, nome, situacao);
        console.log(`CD #${item.id_item} atualizado com sucesso!`);
      } else {
        console.log("Dados Incorretos [A] - Ativo / [I] - Inativo");
      }
    }
  }

  private async delete(): Promise<void> {
    await this.list();
    let id: number = Number(prompt("Qual o id: "));
    let item: Item | null = await this.controller.find(id);
    if (item) {
      await this.controller.delete(item);
      console.log(`Item #${id} deletado com sucesso!`);
    } else {
      console.log("Item não encontrado!");
    }
  }
}
