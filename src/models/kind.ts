/*
 * @Description:论坛分类
 * @Version: 1.0
 * @Date: 2021-08-27 20:22:20
 * @LastEditTime: 2021-08-27 20:51:29
 */

import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class kind extends BaseEntity {
	@Column()
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		charset: 'utf8mb4',
		type: 'varchar',
		length: 50,
		comment: '论坛名称',
	})
	name!: string;

	@Column({
		charset: 'utf8mb4',
		type: 'varchar',
		length: 200,
		comment: '论坛介绍',
	})
	pio!: string;

	@Column({
		comment: '论坛图片',
	})
	avatar!: string;

	@CreateDateColumn()
	createtime!: Date;
}
