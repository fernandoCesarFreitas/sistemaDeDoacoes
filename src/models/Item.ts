import { Categoria } from './Categorias';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_item: number;

  @Column({ length: 255, nullable: true })
  nome: string;

  @ManyToOne(() => Categoria, { eager: true }) // Define a relação com a entidade Categoria
  @JoinColumn({ name: 'categoria_id_categoria' })
  categoria: Categoria;
}
