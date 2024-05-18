import { Entity, Column } from "typeorm";
import { BaseModel } from "./base.model";

@Entity()
export class Products extends BaseModel {
  @Column()
  name: string;

  @Column({ unique: true })
  description: string;

  @Column()
  value: number;

  @Column()
  imageUrl: string;
}