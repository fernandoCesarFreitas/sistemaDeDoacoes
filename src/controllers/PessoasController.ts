import { Pessoas } from "../models/Pessoas";
let pessoa: Pessoas = new Pessoas();

export class PessoasController {
  async list() {
    return await Pessoas.find();
  }

  async find(idPessoa: number) {
    return await Pessoas.findOneBy({ idPessoa });
  }

  async create(
    nome: string,
    endereco: string,
    cidadeId: number
  ): Promise<Pessoas> {
    pessoa.nome = nome;
    pessoa.endereco = endereco;
    pessoa.cidade_id_cidade = cidadeId;

    await pessoa.save();
    return pessoa;
  }

  async edit(pessoa: Pessoas, nome: string, endereco: string) {
    pessoa.nome = nome;
    pessoa.endereco = endereco;
    await pessoa.save();

    return pessoa;
  }

  async delete(pessoa: Pessoas): Promise<void> {
    await pessoa.remove();
  }
}
