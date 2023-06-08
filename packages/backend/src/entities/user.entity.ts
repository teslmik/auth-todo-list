import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { Todo } from './entities';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'timestamp',
    default: () => 'NOW()'
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'NOW()'
  })
  updatedAt: Date;

  @OneToMany(() => Todo, (todo) => todo.user, { cascade: true })
  todosId: string[];
}
