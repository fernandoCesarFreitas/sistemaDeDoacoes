import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Categoria extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ length: 255 })
  descricao: string;
}
