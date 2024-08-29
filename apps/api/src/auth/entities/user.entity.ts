import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface UserUniqueAttr {
  id?: string;
  email: string;
}
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { length: 100 })
  name: string;

  @Column('character varying', { length: 255, unique: true })
  email: string;

  @Column('character varying', { length: 255 })
  password: string;

  @Column('boolean', { default: true })
  active: boolean;
}
