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
    type: "int",
  })
  currentChallenge: number | null;

  @Column({
    nullable: true,
  })
  name: string;
}
