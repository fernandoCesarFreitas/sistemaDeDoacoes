import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Cidade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_cidade: number;

  @Column({ length: 255 })
  nome: string;
}
