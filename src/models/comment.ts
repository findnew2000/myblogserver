import {
	BaseEntity,
	Column,
	Entity,
	Index,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Index(['author', 'post'])
@Entity()
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		type: 'varchar',
		length: 50,
		comment: '用户名',
	})
	author!: string;

	@Column({
		type: 'int',
		comment: '主贴id',
	})
	post!: number;

	@Column({
		type: 'text',
		charset: 'utf8mb4',
		comment: '评论',
	})
	content!: string;
}
