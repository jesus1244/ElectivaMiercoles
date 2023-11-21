/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumnCannotBeNullableError,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: String;

  @Column({ nullable: true })
  lastName: String;

  @Column()
  email: String;

  @Column()
  username: String;

  @Column()
  password: String;
}
