import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Cidade } from './Cidades';

@Entity('beneficiarios')
export class Beneficiario extends BaseEntity {
  @PrimaryGeneratedColumn()
  idbenificiario: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 255 })
  endereco: string;

  @Column({})
  public cidade_id_cidade: number;

  @ManyToOne(() => Cidade, (cidade) => cidade.beneficiarios) // Define a relação com a entidade beneficiarios
  @JoinColumn({ name: 'cidade_id_cidade' })
  public cidade: Cidade;
}
