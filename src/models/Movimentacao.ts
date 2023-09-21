import { type } from "os";
import { Pessoas } from "./Pessoas";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { CdItem } from "./Cd_item"; // Importe a entidade CdItem aqui

@Entity("movimentacoes")
export class Movimentacao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_movimentacao: number;

  @Column({ type: "timestamp", default: "now()" })
  data_Hora: string;

  @Column()
  tipo: string;

  @Column()
  quantidade: number;

  @Column({ nullable: true })
  doador: string;

  @ManyToOne(() => Pessoas, (pessoas) => pessoas.movimentacoes) // Define a relação com a entidade
  @JoinColumn({ name: "pessoas_id_pessoas" })
  public pessoas: Pessoas;

  @Column({})
  public cd_item_idcd_item: number;

  @ManyToOne(() => CdItem, (cdItem) => cdItem.movimentacoes)
  @JoinColumn({ name: "cd_item_idcd_item" })
  cdItem: CdItem;
}
