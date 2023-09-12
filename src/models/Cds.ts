import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Cidade } from './Cidades';

@Entity()
export class CD extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_CD: number;

  @Column({ length: 255 })
  nome: string;

  @ManyToOne(() => Cidade, { eager: true }) // Define a relação com a entidade Cidade
  @JoinColumn({ name: 'cidade_id_cidade' })
  cidade: Cidade;
}
