import { Beneficiario } from "../models/Benificiarios";
let beneficiario: Beneficiario = new Beneficiario();


export class BenificiariosController {

  async list() {
    return await Beneficiario.find();
  }

  async find (idbenificiario: number) {
    return await Beneficiario.findOneBy({ idbenificiario });
  }

  async create(
    nome: string,
    endereco: string,
    cidadeId: number,
  ):Promise <Beneficiario> {
    beneficiario.nome = nome;
    beneficiario.endereco =  endereco;
    beneficiario.cidade_id_cidade = cidadeId;

    await beneficiario.save();
    return beneficiario;
  }

  async edit(beneficiario: Beneficiario, nome: string, endereco: string) {
    beneficiario.nome = nome;
    beneficiario.endereco = endereco;
    await beneficiario.save();

    return beneficiario;
  }

  
  
  async delete(beneficiario: Beneficiario): Promise<void> {
    await beneficiario.remove();
  }

}
