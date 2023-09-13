import { OneToMany,Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { CD } from './Cds';
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

  @OneToMany(() => CD, (cd) => cd.cidade)
  public cds: Promise<CD[]>;
}
