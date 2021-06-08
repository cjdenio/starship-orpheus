import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";

@Entity()
export class Team extends BaseEntity {
  @PrimaryColumn({
    type: "int",
  })
  id: number;

  @Column()
  channel: string;

  @Column({
    nullable: true,
  })
  currentChallenge: number;

  @Column({
    nullable: true,
  })
  name: string;
}
