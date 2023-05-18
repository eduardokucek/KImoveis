import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import RealEstate from "./realEstate.entity";

@Entity("address")
class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45 })
  street: string;

  @Column({ type: "varchar", length: 8 })
  zipCode: string;

  @Column({ type: "varchar", length: 7, nullable: true })
  number: string | number | null | undefined;

  @Column({ type: "varchar", length: 20 })
  city: string;

  @Column({ type: "varchar", length: 2 })
  state: string;

  @OneToOne(() => RealEstate, (realEstate) => realEstate.address)
  realEstate: RealEstate;
}

export default Address;
