import { Cidade } from "../models/Cidades";

export class CidadesController {
    async list(): Promise<Cidade[]> {
      return await Cidade.find({ where: { situacao: "A" } });
      }

      async create(
        nome: string,
        situacao: string,
      ): Promise<Cidade> {
        let cidade: Cidade = await Cidade.create({
          nome,
          situacao,
        }).save();
        return cidade;
      }

      async edit(
        cidade: Cidade,
        descricao: string,
        situacao: string,
      ): Promise<Cidade> {
        cidade.nome = descricao;
        cidade.situacao = situacao;
        await cidade.save();
        return cidade;
      }
      
      async delete(cidade:Cidade) {
        cidade.situacao = 'I';
        await cidade.save();
      }
      async find (id: number): Promise<Cidade|null> {
        return await Cidade.findOneBy({ id_cidade:id });
      }
    
}