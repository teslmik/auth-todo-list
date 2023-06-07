import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
