import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Voluntario extends BaseEntity {
  @PrimaryGeneratedColumn()
  idvoluntario: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 255 })
  senha: string;

  @Column({ length: 255 })
  email: string;
  @Column({
    type: "char",
  })
  public situacao: string;
}
