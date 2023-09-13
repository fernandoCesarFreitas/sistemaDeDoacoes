// import { MenuRelatorios } from "./MenuRelatorio";
import { Voluntario } from "../models/Voluntarios";
import { BeneficiariosMenu } from "./BeneficiariosMenu";
import { VoluntarioController } from "../controllers/VoluntariosController";
import { MenuVoluntarios } from "./VoluntariosMenu";
import PromptSync from "prompt-sync";
const prompt = PromptSync();

export class Menu {
  public menuBenificiario: BeneficiariosMenu;
  public voluntarioController: VoluntarioController;
  public menuVoluntario: MenuVoluntarios;

  constructor() {
    this.menuBenificiario = new BeneficiariosMenu();
    this.voluntarioController = new VoluntarioController();
    this.menuVoluntario = new MenuVoluntarios();
  }
  async menu() {
    let cont: number = 0;
    while (cont < 3) {//
      let nome: string = prompt("Nome: ");//
      let senha: string = prompt("Senha: ");//

      let ok;//

      let okU: Voluntario | null = await this.voluntarioController.checker(nome);//

      if (okU) {//
        ok = this.voluntarioController.checkPassword(senha, okU.senha);//
      }//

      if (ok && okU != null) {//
        this.voluntarioController.setusuarioLogado(okU);//
    cont = 3;
    let input: number = 0;
    do {
      console.clear();
      console.log(`Bem-vindo ${okU.nome}`);
      console.log(
        "*======* CONTROLE DE DESPESAS *======*\n" +
          "[1]- Voluntários\n" +
          "[2]- benificiário \n" +
          "[3]- Cidades \n" +
          "[4]- Categorias \n" +
          "[5]- Itens \n" +
          "[5]- Movimentações \n" +
          "[0]- Sair"
      );
      input = Number(prompt("Selecione a opção desejada: "));

      switch (input) {
        case 1:
          await this.menuVoluntario.menuVoluntario();
          break;
        case 2:
          await this.menuBenificiario.show();
          break;
        case 3:
          break;
        case 4:
          break;
        case 4:
          break;
        default:
          console.clear();
          // console.log(`Até logo ${okU.nome}!`);
          break;
      }

      if (input != 0) {
        prompt("presione qualquer tecla para continuar");
      }
    } while (input != 0);
    } else {//
      console.log("Usuário ou senha inválidos");//
    }//
    if (cont > 3) {//
      console.log(`Voce possui mais ${2 - cont}, tentativas!`);//
    }//
    cont++;//
    }//
  }
}
