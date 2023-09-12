import PromptSync from "prompt-sync";
import DB from "./db";// esse import conecta com o banco
import { BeneficiariosMenu } from "./views/BeneficiariosMenu";

const prompt = PromptSync();

let input: string | null = " ";

async function main(): Promise<void> {
  await DB.initialize();

  let beneficiariosMenu = new BeneficiariosMenu();


  do {
    console.clear();
    beneficiariosMenu.show();
    console.log("0 - Sair");
    input = prompt("Selecione a opção desejada: ");

    if (input != "0") {
      await beneficiariosMenu.execute(input);
      prompt("Pressione enter para continuar");
    }
  } while (input != "0");
  
}

main();

// console.log(DB)
