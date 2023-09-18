import { type } from 'os';
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

  @Column({ type: "timestamp", 
  default: "now()"})
  data_Hora: string;

  @Column({ length: 255 })
  tipo: string;

  @Column({ type: "int" })
  quantidade: number;

  @Column({ length: 255, nullable: true })
  doador: string;

  @Column({})
  public pessoas_id_pessoas: number;

  @ManyToOne(() => Pessoas, (pessoas) => pessoas.pessoas) // Define a relação com a entidade Cidade
  @JoinColumn({ name: "pessoas_id_pessoas" })
  public pessoas: Pessoas;

  @Column({})
  public cd_item_idcd_item: number;

  @ManyToOne(() => CdItem, (cd_item) => cd_item.cd_item)
  @JoinColumn({ name: "cd_item_idcd_item" })
  public cd_item: CdItem;
}
