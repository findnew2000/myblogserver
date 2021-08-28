/*
 * @Description: 帖子点赞
 * @Version: 1.0
 * @Date: 2021-08-27 20:54:09
 * @LastEditTime: 2021-08-27 20:55:24
 */
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PostOK extends BaseEntity {
	@Column()
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		comment: '被点赞帖子ID',
	})
	okPostid!: number;

	// FIXME 用户名应该换成uid
	@Column({
		type: 'varchar',
		length: 50,
		comment: '点赞帖子用户名',
	})
	okUsername!: string;

	@Column({
		comment: '点赞状态',
	})
	status!: boolean;

	@CreateDateColumn()
	createtime!: Date;

	@UpdateDateColumn()
	updatetime!: Date;
}
