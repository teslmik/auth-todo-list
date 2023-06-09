import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './entities';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  complited: boolean;

  @Column({ default: false })
  private: boolean;

  @ManyToOne(() => User, (user) => user.todosId)
  user: string;

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
}
