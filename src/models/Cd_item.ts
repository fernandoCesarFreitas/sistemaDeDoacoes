import { Item } from "./Item";
import { CD } from "./Cds";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Movimentacao } from "./Movimentacao";

@Entity("cd_item")
export class CdItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  public cd_id: number;

  @ManyToOne(() => CD, (cd) => cd.cdItems)
  @JoinColumn({ name: "cd_id" })
  cd: CD;
  
  @Column({})
  public item_id: number;

  @ManyToOne(() => Item, (item) => item.cdItems)
  @JoinColumn({ name: "item_id" })
  item: Item;

  @Column({})
  public movimentacao_id: number;

  @ManyToOne(() => Movimentacao, (movimentacao) => movimentacao.cdItem)
  @JoinColumn({ name: "movimentacao_id" })
  movimentacao: Movimentacao;

  @Column()
  quantidade: number;
}

// @Entity('cd_item')
// export class CdItem extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id_cd_item: number;

//   @Column({ type: 'int' })
//   quantidade: number;

//   @OneToMany(() => Movimentacao, (movimentacao) => movimentacao.cd_item) //relacao com a tabela movimentacoes 1/n
//   public cd_item: Promise<Movimentacao[]>

//   @Column({})
//   public cd_id_cd: number;

//   @ManyToOne(() => CD, (cd) => cd.cd) // Define a relação com a entidade CD
//   @JoinColumn({ name: 'cd_id_cd' })
//   public cd: CD;

//   @Column({})
//   public item_id_item: number;

//   @ManyToOne(() => Item, (item) => item.item) // Define a relação com a entidade Item
//   @JoinColumn({ name: 'item_id_item' })
//   public item: Item;

// //   @ManyToMany(() => Item, (item)=> item.item) // Define a relação com a entidade Item
// //   @JoinColumn({ name: 'item_id_item' })
// //   item: Item;
// }
