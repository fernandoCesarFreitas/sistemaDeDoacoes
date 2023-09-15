import { OneToMany,Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { CD } from './Cds';
import { Beneficiario } from './Benificiarios';
@Entity('cidades')
export class Cidade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_cidade: number;

  @Column({ length: 255 })
  nome: string;

  @Column({
    type: "char",
  })
  public situacao: string;

  @OneToMany(() => CD, (cd) => cd.cidade)//relacao com a tabela CD 1/n
  public cds: Promise<CD[]>;

  @OneToMany(() => Beneficiario, (beneficiario) => beneficiario.cidade)//relacao com a tabela beneficiario 1/n
  public beneficiarios: Promise<Beneficiario[]>;
}
