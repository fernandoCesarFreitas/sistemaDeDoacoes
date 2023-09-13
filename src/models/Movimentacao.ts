import { Beneficiario } from './Benificiarios';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { CdItem } from './cd_item'; // Importe a entidade CdItem aqui

@Entity('movimentacoes')
export class Movimentacao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_movimentacao: number;

  @Column({ type: 'timestamp' })
  data_Hora: Date;

  @Column({ length: 255 })
  tipo: string;

  @Column({ type: 'int' })
  quantidade: number;

  @Column({ length: 255, nullable: true })
  doador: string;

  @ManyToOne(() => Beneficiario, { eager: true }) // Define a relação com a entidade Beneficiario
  @JoinColumn({ name: 'benificiario_idbenificiario' })
  beneficiario: Beneficiario;

  @ManyToOne(() => CdItem, { eager: true }) // Define a relação com a entidade CdItem
  @JoinColumn({ name: 'cd_item_idcd_item' })
  cd_item: CdItem;
}
