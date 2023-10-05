import { Categoria } from './Categorias';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn,OneToMany,} from 'typeorm';
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

  @OneToMany(() => CdItem, (cdItem) => cdItem.item)
  cdItems: CdItem[];


  @ManyToOne(() => Categoria, (categoria) => categoria.itens, { eager: true }) // Define a relação com a entidade Cidade
  @JoinColumn({ name: 'categoria_id_categoria' })
  public categoria: Categoria;

}

//nullable: true 