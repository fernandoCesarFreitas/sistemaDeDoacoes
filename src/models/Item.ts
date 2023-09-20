
import { Categoria } from './Categorias';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn,OneToMany,ManyToMany} from 'typeorm';
import { CdItem } from './Cd_item';

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

  // @OneToMany(() => CdItem, (cdItem) => cdItem.item) //relacao com a tabela CD 1/n
  // public item: Promise<CdItem[]>;


  @ManyToOne(() => Categoria, (categoria) => categoria.categoria) // Define a relação com a entidade Cidade
  @JoinColumn({ name: 'categoria_id_categoria' })
  public categoria: Categoria;

  @ManyToMany(() => CdItem, (cditen)=> cditen.item) // Define a relação com a entidade Item
  @JoinColumn({ name: 'item_id_item' })
  item: CdItem;
}

//nullable: true 