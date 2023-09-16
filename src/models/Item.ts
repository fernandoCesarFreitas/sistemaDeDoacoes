import { Categoria } from './Categorias';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';

@Entity('itens')
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_item: number;

  @Column({ length: 255 })
  nome: string;

  @Column({
    type: "char",
  })
  public situacao: string;

  @Column({})
  public categoria_id_categoria: number;


  @ManyToOne(() => Categoria, (categoria) => categoria.categoria) // Define a relação com a entidade Cidade
  @JoinColumn({ name: 'categoria_id_categoria' })
  public categoria: Categoria;
}

//nullable: true 