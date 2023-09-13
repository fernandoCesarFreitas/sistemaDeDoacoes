import { Item } from './Item';
import { CD } from './Cds';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';

@Entity('cd_item')
export class CdItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_cd_item: number;

  @Column({ type: 'int' })
  quantidade: number;

  @ManyToOne(() => CD, { eager: true }) // Define a relação com a entidade CD
  @JoinColumn({ name: 'CD_id_CD' })
  cd: CD;

  @ManyToOne(() => Item, { eager: true }) // Define a relação com a entidade Item
  @JoinColumn({ name: 'item_id_item' })
  item: Item;
}
