import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export default class Team {
  @PrimaryColumn()
  id: string;

  @Column()
  channel: string;
}

@Entity()
export class Photo {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  filename: string;

  @Column()
  views: number;

  @Column()
  isPublished: boolean;
}
