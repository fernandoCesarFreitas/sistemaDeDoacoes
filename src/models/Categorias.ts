import { Entity, PrimaryGeneratedColumn, Column, BaseEntity ,OneToMany, } from 'typeorm';
import { Item } from './Item';
@Entity('categorias')
export class Categoria extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ length: 255 })
  descricao: string;

  @OneToMany(() => Item, (item) => item.categoria)
  itens: Item[];
}
