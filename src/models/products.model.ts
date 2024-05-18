import { Entity, Column } from "typeorm";
import { BaseModel } from "./base.model";

@Entity()
export class Products extends BaseModel {
  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  value: string;

  @Column()
  imageUrl: string;
}
