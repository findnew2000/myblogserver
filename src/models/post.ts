import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	Index,
	BaseEntity,
} from 'typeorm';

@Entity()
export class Post extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Index()
	@Column({
		type: 'varchar',
		length: 50,
		comment: '用户名',
	})
	author!: string;

	@Column({
		type: 'varchar',
		length: 200,
		charset: 'utf8mb4',
		comment: '标题',
	})
	title!: String;

	@Column({
		type: 'text',
		charset: 'utf8mb4',
		comment: '帖子内容',
	})
	content!: string;

	@Column({
		type: 'int',
		nullable: true,
		comment: '点赞数',
	})
	pv!: number;

	@Column({
		type: 'varchar',
		nullable: true,
		length: 200,
		comment: '图片',
	})
	avatar!: string;
}
