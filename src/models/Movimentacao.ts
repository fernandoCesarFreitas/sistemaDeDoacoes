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

  @Column({nullable: true })
  public pessoas_id_pessoas: number;

  @ManyToOne(() => Pessoas, (pessoas) => pessoas.movimentacoes) // Define a relação com a entidade
  @JoinColumn({ name: "pessoas_id_pessoas" })
  public pessoas: Pessoas;

  @Column({})
  public cd_item_idcd_item: number;

  @ManyToOne(() => CdItem, (cdItem) => cdItem.movimentacoes)
  @JoinColumn({ name: "cd_item_idcd_item" })
  cdItem: CdItem;

  toJSON() {
    return {
      id_movimentacao: this.id_movimentacao,
      data_Hora: this.data_Hora,
      tipo: this.tipo,
      quantidade: this.quantidade,
      doador: this.doador,
      pessoas_id_pessoas: this.pessoas_id_pessoas,
      pessoas: this.pessoas ? this.pessoas.toJSON() : null, // Chama toJSON de Pessoas
      cd_item_idcd_item: this.cd_item_idcd_item,
      cdItem: this.cdItem ? this.cdItem.toJSON() : null, // Chama toJSON de CdItem
    };
  }
}
