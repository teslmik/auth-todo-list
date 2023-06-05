import { BaseEntity, Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  complited: string;
}
