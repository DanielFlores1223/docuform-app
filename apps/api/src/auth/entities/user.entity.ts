import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('char varying', { length: 100 })
  name: string;

  @Column('char varying', { length: 255 })
  email: string;

  @Column('char varying', { length: 255 })
  password: string;

  @Column('boolean', { default: true })
  active: boolean;
}
