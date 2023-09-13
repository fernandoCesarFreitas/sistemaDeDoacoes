import PromptSync from "prompt-sync";
import DB from "./db"; // esse import conecta com o bamco
import { Menu } from "./views/Menu";
import { BeneficiariosMenu } from "./views/BeneficiariosMenu";
import { CategoriasMenu } from "./views/CategoriasMenu";

const prompt = PromptSync();


async function main(): Promise<void> {
  await DB.initialize();
  const menu = new Menu();
  menu.menu();

  // let beneficiariosMenu = new BeneficiariosMenu();
  // let cadegoriasMenu = new CategoriasMenu();


  // do {
  //   console.clear();
  //   beneficiariosMenu.show();
  //   cadegoriasMenu.show();
  //   console.log("0 - Sair");
  //   input = prompt("Selecione a opção desejada: ");

  //   if (input != "0") {
  //     await beneficiariosMenu.execute(input);
  //     await cadegoriasMenu.execute(input);
  //     prompt("Pressione enter para continuar");
  //   }
  // } while (input != "0");
}

main();


// 
