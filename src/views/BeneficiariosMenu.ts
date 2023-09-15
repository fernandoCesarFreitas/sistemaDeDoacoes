import { BenificiariosController } from "../controllers/BenificiariosController";
import PromptSync from "prompt-sync";
import { Beneficiario } from "../models/Benificiarios";
import { CidadesController } from '../controllers/CidadesController';
import { Cidade } from "../models/Cidades";

const prompt = PromptSync();

export class BeneficiariosMenu {
  public controller: BenificiariosController;
  public cController: CidadesController;

  constructor() {
    this.controller = new BenificiariosController();
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
      }
      if (parseInt(input) != 0) {
        prompt("presione qualquer tecla para continuar");
      }
    } while (parseInt(input) != 0);
  }

  private async list(): Promise<void> {
    let beneficiarios = await this.controller.list();
    console.table(beneficiarios);
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
          let beneficiario: Beneficiario = await this.controller.create(
            nome,
            endereco,
            cidade.id_cidade,
          );
          console.log(`Beneficiario ID #${beneficiario.idbenificiario} criado com sucesso!`);
        } catch (error: any) {
          console.log(error.message);
        }
      } else {
        console.log("Cidade não encontrada. Tente novamente ou digite 0 para sair.");
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
    let beneficiario: Beneficiario | null = await this.controller.find(id);

    if (beneficiario) {
      let name = prompt(`Nome ${beneficiario.nome}`, beneficiario.nome);
      let endereco = prompt(
        `Endereço ${beneficiario.endereco}`,
        beneficiario.endereco
      );

      beneficiario = await this.controller.edit(beneficiario, name, endereco);
      console.log(
        `Cliente ID #${beneficiario.idbenificiario} atualizado com sucesso!`
      );
    } else {
      console.log("Cliente não encontrado");
    }
    console.log("Cliente atualizado com sucesso!");
  }

  private async delete(): Promise<void> {
    let id: number = Number(prompt("Qual o ID?"));

    let beneficiario: Beneficiario | null = await this.controller.find(id);
    if (beneficiario) {
      await this.controller.delete(beneficiario);
      console.log(`Cliente ID#${id} excluído com sucesso!`);
    } else {
      console.log("Cliente não encontrado");
    }
  }
}
