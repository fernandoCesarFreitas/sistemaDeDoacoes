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
} from "typeorm";
import { Movimentacao } from "./Movimentacao";

@Entity("cd_item")
export class CdItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  public cd_id: number;

  @ManyToOne(() => CD, (cd) => cd.cdItems, { eager: true })
  @JoinColumn({ name: "cd_id" })
  cd: CD;

  @Column()
  public item_id: number;

  @ManyToOne(() => Item, (item) => item.cdItems, { eager: true })
  @JoinColumn({ name: "item_id" })
  item: Item;

  @OneToMany(() => Movimentacao, (movimentacao) => movimentacao.cdItem)
  movimentacoes: Movimentacao[];

  @Column()
  quantidade: number;
}
