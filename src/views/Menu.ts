import { MenuCidade } from './MenuCidades';
// import { MenuRelatorios } from "./MenuRelatorio";
import { Voluntario } from "../models/Voluntarios";
import { BeneficiariosMenu } from "./BeneficiariosMenu";
import { VoluntarioController } from "../controllers/VoluntariosController";
import { MenuVoluntarios } from "./VoluntariosMenu";
import { MenuCD } from './MenuCd';
import { CategoriasMenu } from './CategoriasMenu';
import PromptSync from "prompt-sync";
const prompt = PromptSync();

export class Menu {
  public menuBenificiario: BeneficiariosMenu;
  public voluntarioController: VoluntarioController;
  public menuVoluntario: MenuVoluntarios;
  public menuCidade: MenuCidade;
  public menuCd: MenuCD;
  public menuCategorias : CategoriasMenu;

  constructor() {
    this.menuBenificiario = new BeneficiariosMenu();
    this.voluntarioController = new VoluntarioController();
    this.menuVoluntario = new MenuVoluntarios();
    this.menuCidade =  new MenuCidade();
    this.menuCd =  new MenuCD();
    this.menuCategorias = new CategoriasMenu();
  }
  async menu() {
    let cont: number = 0;
    while (cont < 3) {//*
      let nome: string = prompt("Nome: ");//*
      let senha: string = prompt("Senha: ");//*

      let ok;//*

      let okU: Voluntario | null = await this.voluntarioController.checker(nome);//*

      if (okU) {//*
        ok = this.voluntarioController.checkPassword(senha, okU.senha);//*
      }//*

      if (ok && okU != null) {//*
        this.voluntarioController.setusuarioLogado(okU);//*
    cont = 3;
    let input: number = 0;
    do {
      console.clear();
      console.log(`Bem-vindo ${okU.nome}`);//*
      console.log(
        "*======* CONTROLE DE DOAÇÕES *======*\n" +
          "[1]- Voluntários\n" +
          "[2]- benificiário \n" +
          "[3]- Cidades \n" +
          "[4]- CD's \n" +
          "[5]- Categorias \n" +
          "[6]- Itens \n" +
          "[7]- Movimentações \n" +
          "[0]- Sair"
      );
      input = Number(prompt("Selecione a opção desejada: "));

      switch (input) {
        case 1:
          await this.menuVoluntario.menuVoluntario();
          break;
        case 2:
          await this.menuBenificiario.show();
          await this.menuBenificiario.execute();
          break;
        case 3:
          await this.menuCidade.menuCidade();
          break;
        case 4:
          await this.menuCd.menuCD();
          break;
        case 5:
          await this.menuCategorias.show();
          await this.menuCategorias.execute();
          break;
        default:
          console.clear();
          console.log(`Até logo ${okU.nome}!`);//*
          break;
      }

      if (input != 0) {
        prompt("presione qualquer tecla para continuar");
      }
    } while (input != 0);
    } else {//*
      console.log("Usuário ou senha inválidos");//*
    }//*
    if (cont > 3) {//*
      console.log(`Voce possui mais ${2 - cont}, tentativas!`);//*
    }//*
    cont++;//*
    }//*
  }
}
