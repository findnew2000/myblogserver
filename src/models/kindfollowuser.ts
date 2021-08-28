/*
 * @Description:分类关注表
 * @Version: 1.0
 * @Date: 2021-08-27 20:49:06
 * @LastEditTime: 2021-08-27 20:56:09
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
export class KindFollowUser extends BaseEntity {
	@Column()
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		comment: '被关注的分类ID',
	})
	followKindid!: number;

	// FIXME 用户名应该换成uid
	@Column({
		type: 'varchar',
		length: 50,
		comment: '关注该分类的用户名',
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
