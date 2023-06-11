import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '.';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column()
  private: boolean;

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

  @ManyToOne(() => User, (user) => user.todos, {
    onDelete: 'CASCADE'
  })
  user: User;
}
