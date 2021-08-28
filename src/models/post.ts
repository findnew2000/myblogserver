/*
 * @Description: 帖子模型
 * @Version: 1.0
 * @Date: 2021-08-13 23:35:06
 * @LastEditTime: 2021-08-27 21:21:17
 */
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	Index,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
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
		comment: '分类id',
	})
	kindid!: number;

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
		comment: '浏览量',
	})
	pv!: number;

	@Column({
		type: 'varchar',
		nullable: true,
		length: 200,
		comment: '图片',
	})
	avatar!: string;

	@CreateDateColumn()
	createtime!: Date;

	@UpdateDateColumn()
	updatetime!: Date;
}
