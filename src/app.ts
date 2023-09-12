import PromptSync from "prompt-sync";
import DB from "./db";// esse import conecta com o banco

const prompt = PromptSync();

async function main(): Promise<void> {
  await DB.initialize();

  
}

main();

// console.log(DB)
