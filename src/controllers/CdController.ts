import { CD } from './../models/Cds';
let cd: CD = new CD();

export class CdController {
  async list(): Promise<CD[]> {
      return await CD.find({ where: { situacao: "A" } });
      }



      async create(
        nome: string,
        situacao: string,
        cidadeId: number,
      ):Promise <CD> {
        cd.nome = nome;
        cd.situacao =  situacao;
        cd.cidade_id_cidade = cidadeId;

        await cd.save();
        return cd;
      }

      async edit(
        cd: CD,
        descricao: string,
        situacao: string,
      ): Promise<CD> {
        cd.nome = descricao;
        cd.situacao = situacao;
        await cd.save();
        return cd;
      }
      
      async delete(cd:CD) {
        cd.situacao = 'I';
        await cd.save();
      }
      async find (id: number): Promise<CD|null> {
        return await CD.findOneBy({ id_CD:id });
      }
    
}