import { Voluntario } from '../models/Voluntarios';
import * as bcrypt from 'bcrypt';
import PromptSync from "prompt-sync";
const prompt = PromptSync();
let user: Voluntario = new Voluntario();
let userId : Voluntario;

export class VoluntarioController {

 async list(): Promise<Voluntario[]> {
    return await Voluntario.find();
  }

  async listActive(): Promise<Voluntario[]> {
    return await Voluntario.find({ where: { situacao: "A" } });
  }

  async create(
    nome: string,
    email: string,
    senha: string,
    situacao: string = 'A',
    
  ): Promise<Voluntario> {
    let voluntario: Voluntario = await Voluntario.create({
      nome,
      email,
      senha,
      situacao,
     
    }).save();
    return voluntario;
  }


  async edit(
    voluntario: Voluntario,
    nome: string,
    email: string,
    senha: string,
    situacao: string,
    
  ): Promise<Voluntario> {
    voluntario.nome = nome;
    voluntario.email = email;
    voluntario.senha = senha;
    voluntario.situacao = situacao;
      
    await voluntario.save();
    return voluntario;
  }

  async delete(voluntario:Voluntario) {
    voluntario.situacao = 'I';
    await voluntario.save();
  }

  async checker(nome: string) {
    let voluntario: Voluntario | null = await Voluntario.findOneBy({ nome: nome });
    return voluntario;
  }

  async find (id: number): Promise<Voluntario|null> {
    return await Voluntario.findOneBy({ idvoluntario:id });
  }
  
   setusuarioLogado(id:Voluntario ){
  userId = id;
  }

   getusuarioLogado():Voluntario{
    return userId;
  }

  async  setPassword(password: string): Promise<string> {
    const saltRounds = 10; // Número de rounds de hashing (quanto maior, mais seguro)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async  checkPassword(inputPassword: string, storedHash: string): Promise<boolean> {
    return await bcrypt.compare(inputPassword, storedHash);
  }

 
}
