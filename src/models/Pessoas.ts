import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Cidade } from './Cidades';

@Entity('pessoas')
export class Pessoas extends BaseEntity {
  @PrimaryGeneratedColumn()
  idPessoa: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 255 })
  endereco: string;

  @Column({})
  public cidade_id_cidade: number;

  @ManyToOne(() => Cidade, (cidade) => cidade.pessoas) // Define a relação com a entidade beneficiarios
  @JoinColumn({ name: 'cidade_id_cidade' })
  public cidade: Cidade;
}
