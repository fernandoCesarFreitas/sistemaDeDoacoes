import PromptSync from "prompt-sync";
import { Voluntario } from "../models/Voluntarios";
import { VoluntarioController } from "../controllers/VoluntariosController";
const prompt = PromptSync();

export class MenuVoluntarios {
  public controller: VoluntarioController;

  constructor() {
    this.controller = new VoluntarioController();
  }
  async menuVoluntario() {
    let opcao: number = 0;
    do {
      console.clear();
      console.log(
        "[1]- Listar Voluntários\n" +
          "[2]- Cadastrar novo voluntário\n" +
          "[3]- Editar voluntário \n" +
          "[4]- Deletar voluntário \n" +
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
          break;
      }
      if (opcao != 0) {
        prompt("presione qualquer tecla para continuar");
      }
    } while (opcao != 0);
  }
  private async list(): Promise<void> {
    let voluntarios: Voluntario[] = await this.controller.listActive();
    console.table(voluntarios);
  }

  private async create(): Promise<void> {
    let situacao: string = 'A'
    let nome: string = prompt("Nome: ");
    let email: string = prompt("E-mail: ");
    let senha: string = prompt("Senha: ");

    let s;
     s = await this.controller.setPassword(senha);

    let voluntario: Voluntario = await this.controller.create(
      nome,
      email,
      s,
      situacao
    );
    console.log(`cliente #${voluntario.idvoluntario} criado com sucesso`);
  }

  private async edit(): Promise<void> {
    await this.list();
    let id: number = Number(prompt("Qual o ID do voluntário? "));
    let voluntario: Voluntario | null = await this.controller.find(id);
    if (voluntario) {
      let nome = prompt(`Nome (${voluntario.nome}): `, voluntario.nome);
      let email = prompt(`E-mail (${voluntario.email}): `, voluntario.email);
      let senha = prompt(`Senha (${voluntario.senha}): `, voluntario.senha);

      let s;
      s = await this.controller.setPassword(senha);
      let situacao = prompt(
        `Situção(${voluntario.situacao}): `,
        voluntario.situacao
      ).toLocaleUpperCase();
      
      voluntario = await this.controller.edit(
        voluntario,
        nome,
        email,
        s,
        situacao
      );
      console.log(`Cliente ID #${voluntario.idvoluntario} atualizado com sucesso!`);
    } else {
      console.log("Cliente não encontrado!");
    }
  }

  private async delete(): Promise<void> {
    let id: number = Number(prompt("Qual o id do usuário: "));
    let voluntario: Voluntario | null = await this.controller.find(id);

    if (voluntario != null) {
      let resultado = prompt(
        "Deseja realmente excluir este Usuário? [S/N]"
      ).toLocaleUpperCase();
      if (resultado == "S") {
        this.controller.delete(voluntario);
        console.log(`Usuário #${voluntario.idvoluntario} deletado com Sucesso!`);
      }
    } else {
      console.log("Usuário não encontrado!");
    }
  }
}
