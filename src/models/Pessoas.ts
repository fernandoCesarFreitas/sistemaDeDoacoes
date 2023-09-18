import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn,OneToMany } from 'typeorm';
import { Cidade } from './Cidades';
import { Movimentacao } from './Movimentacao';

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

  @OneToMany(() => Movimentacao, (movimentacao) => movimentacao.pessoas) //relacao com a tabela movimentacoes 1/n
  public pessoas: Promise<Movimentacao[]>

  @ManyToOne(() => Cidade, (cidade) => cidade.pessoas) // Define a relação com a entidade beneficiarios
  @JoinColumn({ name: 'cidade_id_cidade' })
  public cidade: Cidade;
}
