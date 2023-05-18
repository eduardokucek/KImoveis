import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import RealEstate from "./realEstate.entity";

@Entity("category")
class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", unique: true })
  name: string;

  @OneToMany(() => RealEstate, (realEstate) => realEstate.category)
  realEstate: RealEstate;
}

export default Category;
