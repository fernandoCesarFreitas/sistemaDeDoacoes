import {
  OneToMany,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from "typeorm";
import { CD } from "./Cds";
import { Pessoas } from "./Pessoas";
@Entity("cidades")
export class Cidade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_cidade: number;

  @Column({ length: 255 })
  nome: string;

  @Column({
    type: "char",
  })
  public situacao: string;

  @OneToMany(() => CD, (cd) => cd.cidade)
  public cds: Promise<CD[]>;

  @OneToMany(() => Pessoas, (pessoa) => pessoa.cidade)
  public pessoas: Promise<Pessoas[]>;
  
  toJSON() {
    return {
      id_cidade: this.id_cidade,
      nome: this.nome,
      situacao: this.situacao,
      cds: this.cds,
      pessoas: this.pessoas,
    };
  }
}
