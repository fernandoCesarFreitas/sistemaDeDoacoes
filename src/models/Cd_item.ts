
import { Item } from './Item';
import { CD } from './Cds';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn,OneToMany, ManyToMany } from 'typeorm';
import { Movimentacao } from './Movimentacao';






@Entity('cd_item')
export class CdItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_cd_item: number;

  @Column({ type: 'int' })
  quantidade: number;

  @OneToMany(() => Movimentacao, (movimentacao) => movimentacao.cd_item) //relacao com a tabela movimentacoes 1/n
  public cd_item: Promise<Movimentacao[]>

  @Column({})
  public cd_id_cd: number;

  @ManyToOne(() => CD, (cd) => cd.cd) // Define a relação com a entidade CD
  @JoinColumn({ name: 'cd_id_cd' })
  public cd: CD;

  
  @Column({})
  public item_id_item: number;

  @ManyToMany(() => Item, (item)=> item.item) // Define a relação com a entidade Item
  @JoinColumn({ name: 'item_id_item' })
  item: Item;
}
