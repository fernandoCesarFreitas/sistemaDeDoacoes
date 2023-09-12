import { Beneficiario } from "../models/Benificiarios";
import { Between, Not } from 'typeorm';

export class BenificiariosController {

  async list() {
    return await Beneficiario.find();
  }

  async create (nome: string, endereco: string) {
    
    return await Beneficiario.create({
      nome,
      endereco,
    }).save();
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