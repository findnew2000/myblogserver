import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserFollow extends BaseEntity {
	@Column()
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		type: 'varchar',
		length: 50,
	})
	followUsername!: string;

	@Column({
		type: 'varchar',
		length: 50,
	})
	fansUsername!: string;

	@Column()
	status!: boolean;

	@CreateDateColumn()
	createtime!: Date;

	@UpdateDateColumn()
	updatetime!: Date;
}
