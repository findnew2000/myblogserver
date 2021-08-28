/*
 * @Description: 帖子关注表
 * @Version: 1.0
 * @Date: 2021-08-27 20:07:45
 * @LastEditTime: 2021-08-28 01:37:02
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
export class PostFollow extends BaseEntity {
	@Column()
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		comment: '被喜欢帖子ID',
	})
	followPostid!: number;

	// FIXME 用户名应该换成uid
	@Column({
		type: 'varchar',
		length: 50,
		comment: '喜欢帖子用户名',
	})
	fansUsername!: string;

	@Column({
		comment: '喜欢状态',
	})
	status!: boolean;

	@CreateDateColumn()
	createtime!: Date;

	@UpdateDateColumn()
	updatetime!: Date;
}
