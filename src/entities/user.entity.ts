import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import Schedule from "./schedule.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", length: 45 })
  email: string;

  @Column({ type: "boolean", default: true })
  admin: boolean;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date", nullable: true })
  deletedAt?: string | null | undefined;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncryptedPwd = getRounds(this.password);

    if (!isEncryptedPwd) {
      this.password = hashSync(this.password, 10);
    }
  }

  @OneToMany(() => Schedule, (schedules) => schedules.user)
  schedules: Schedule[];
}

export default User;
