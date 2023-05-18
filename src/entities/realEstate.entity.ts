import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Address from "./addresses.entity";
import Category from "./category.entity";
import Schedule from "./schedule.entity";

@Entity("realEstate")
class RealEstate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "decimal",
    precision: 12,
    scale: 2,
    default: 0,
    nullable: true,
  })
  value: string | number | null | undefined;

  @Column({ type: "integer" })
  size: number;

  @Column({ type: "boolean", default: false })
  sold: boolean;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @OneToOne(() => Address, (address) => address.realEstate)
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Category, (category) => category.realEstate)
  category: Category;

  @OneToMany(() => Schedule, (schedules) => schedules.realEstate)
  schedules: Schedule[];
}

export default RealEstate;
