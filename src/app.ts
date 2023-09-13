import PromptSync from "prompt-sync";
import DB from "./db"; // esse import conecta com o bamco
import { Menu } from "./views/Menu";

const prompt = PromptSync();


async function main(): Promise<void> {
  await DB.initialize();
  const menu = new Menu();
  menu.menu();
}

main();


// console.log(DB)
