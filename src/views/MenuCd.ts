import { CdController } from "./../controllers/CdController";
import { CidadesController } from "../controllers/CidadesController";
import PromptSync from "prompt-sync";
const prompt = PromptSync();
import { CD } from "../models/Cds";
import { Cidade } from "../models/Cidades";

export class MenuCD {
  public controller: CdController;
  public cController: CidadesController;
  constructor() {
    this.controller = new CdController();
    this.cController = new CidadesController();
  }
  async menuCD(): Promise<void> {
    let opcao: number = 0;
    do {
      console.clear();
      console.log(
        "[1]- Listar CD's\n" +
          "[2]- Cadastrar novo CD \n" +
          "[3]- Editar CD \n" +
          "[4]- Deletar CD \n" +
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
    let cd: CD[] = await this.controller.list();
    console.table(cd);
  }

  private async create(): Promise<void> {
    // await this.list();
    let nome: string = prompt("Nome: ");
    let situacao: string = "A";

    let listaCidades = await this.cController.list();
    console.table(listaCidades);

    let cidadeId: number = Number(prompt("Id Cidade: "));
    let catId: Cidade | null = await Cidade.findOneBy({
      id_cidade: cidadeId,
    });
    if (!catId) {
      throw new Error("Cidade não encontrada!");
    }

    //   let cd: CD = await this.controller.create(nome, situacao,catId);
    //   console.log(`CD #${cd.id_CD} criado com sucesso!`);
    // }
    try {
      let cd: CD = await this.controller.create(
        nome,
        situacao,
        catId.id_cidade
      );
      console.log(`CD ID #${cd.id_CD} criado com sucesso!`);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  private async edit(): Promise<void> {
    await this.list();
    let id: number = Number(prompt("Qual o ID do CD? "));
    let cd: CD | null = await this.controller.find(id);
    if (cd) {
      let nome = prompt(`nome (${cd.nome}): `, cd.nome);
      let situacao = prompt(
        `Situação (${cd.situacao}): [A]- Ativo / [I]- Inativo`,
        cd.situacao
      ).toUpperCase();
      if (situacao == "A" || situacao == "I") {
        cd = await this.controller.edit(cd, nome, situacao);
        console.log(`CD #${cd.id_CD} atualizado com sucesso!`);
      } else {
        console.log("Dados Incorretos [A] - Ativo / [I] - Inativo");
      }
    }
  }

  private async delete(): Promise<void> {
    await this.list();
    let id: number = Number(prompt("Qual o id: "));
    let cd: CD | null = await this.controller.find(id);
    if (cd) {
      await this.controller.delete(cd);
      console.log(`CD #${id} deletado com sucesso!`);
    } else {
      console.log("CD não encontrado!");
    }
  }
}
