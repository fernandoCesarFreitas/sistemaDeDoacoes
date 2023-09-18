import { CdItem } from './Cd_item';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn,OneToMany } from 'typeorm';
import { Cidade } from './Cidades';

@Entity('cds')
export class CD extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_CD: number;

  @Column({ length: 255 })
  nome: string;

  @Column({
    type: "char",
  })
  public situacao: string;

  @Column({})
  public cidade_id_cidade: number;

  @OneToMany(() => CdItem, (cditem) => cditem.cd) //relacao com a tabela movimentacoes 1/n
  public cd: Promise<CD[]>


  @ManyToOne(() => Cidade, (cidade) => cidade.cds) // Define a relação com a entidade Cidade
  @JoinColumn({ name: 'cidade_id_cidade' })
  public cidade: Cidade;
}
