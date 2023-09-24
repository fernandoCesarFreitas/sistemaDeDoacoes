

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

  @OneToMany(() => CdItem, (cdItem) => cdItem.cd)
  cdItems: CdItem[];


  @ManyToOne(() => Cidade, (cidade) => cidade.cds) // Define a relação com a entidade Cidade
  @JoinColumn({ name: 'cidade_id_cidade' })
  public cidade: Cidade;

  toJSON(): Record<string, any> {
    return {
      id_CD: this.id_CD,
      nome: this.nome,
      situacao: this.situacao,
      cidade_id_cidade: this.cidade_id_cidade,
      cidade: this.cidade ? this.cidade.toJSON() : null,
    };
  }
}
