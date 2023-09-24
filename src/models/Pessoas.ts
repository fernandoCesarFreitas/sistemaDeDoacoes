import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Cidade } from "./Cidades";
import { Movimentacao } from "./Movimentacao";

@Entity("pessoas")
export class Pessoas extends BaseEntity {
  @PrimaryGeneratedColumn()
  idPessoa: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 255 })
  endereco: string;

  @Column({})
  public cidade_id_cidade: number;

  @OneToMany(() => Movimentacao, (movimentacao) => movimentacao.pessoas)
  public movimentacoes: Promise<Movimentacao[]>;

  @ManyToOne(() => Cidade, (cidade) => cidade.pessoas)
  @JoinColumn({ name: "cidade_id_cidade" })
  public cidade: Cidade;
  
  toJSON() {
    return {
      idPessoa: this.idPessoa,
      nome: this.nome,
      endereco: this.endereco,
      cidade_id_cidade: this.cidade_id_cidade,
      cidade: this.cidade ? this.cidade.toJSON() : null, // Chama toJSON de Cidade
    };
  }
}
