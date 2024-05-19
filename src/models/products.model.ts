import { Entity, Column } from "typeorm";
import { BaseModel } from "./base.model";

@Entity()
export class Products extends BaseModel {
  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  amount: string;
  
  @Column()
  imageUrl: string;
}
