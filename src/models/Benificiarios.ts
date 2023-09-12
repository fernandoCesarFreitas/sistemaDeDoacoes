import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Cidade } from './Cidades';// Importe a entidade Cidade aqui

@Entity()
export class Beneficiario extends BaseEntity {
  @PrimaryGeneratedColumn()
  idbenificiario: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 255 })
  endereco: string;

  @ManyToOne(() => Cidade, { eager: true }) // Define a relação com a entidade Cidade
  @JoinColumn({ name: 'cidade_idcidade' })
  cidade: Cidade;
}
