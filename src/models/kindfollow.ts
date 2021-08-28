/*
 * @Description: 帖子属于哪个分类
 * @Version: 1.0
 * @Date: 2021-08-27 20:22:54
 * @LastEditTime: 2021-08-27 21:10:33
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
export class kindFollow extends BaseEntity {
	@Column()
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		comment: '论坛ID',
	})
	followKind!: number;

	@Column({
		comment: '论坛所属帖子id',
	})
	fansPostId!: number;

	@Column({
		comment: '从属状态',
	})
	status!: boolean;

	// @CreateDateColumn()
	// createtime!: Date;

	// @UpdateDateColumn()
	// updatetime!: Date;
}
