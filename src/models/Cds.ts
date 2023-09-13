import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Cidade } from './Cidades';

@Entity()
export class CD extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_CD: number;

  @Column({ length: 255 })
  nome: string;

  @Column({
    type: "char",
  })
  public situacao: string;

  @Column()
  public cidade_id_cidade: number;


  @ManyToOne(() => Cidade, (cidade) => cidade.cds) // Define a relação com a entidade Cidade
  @JoinColumn({ name: 'cidade_id_cidade' })
  public cidade: Cidade;
}
