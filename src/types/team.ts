import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";

@Entity()
export class Team extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  channel: string;
}
