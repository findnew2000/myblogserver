/*
 * @Description: 用户模型
 * @Version: 1.0
 * @Date: 2021-08-13 02:37:42
 * @LastEditTime: 2021-08-27 19:52:21
 */
import {
	Column,
	Entity,
	PrimaryColumn,
	BaseEntity,
	Generated,
	CreateDateColumn,
	UpdateDateColumn,
	VersionColumn,
	Index,
} from 'typeorm';

export enum Gender {
	m = 'Man',
	f = 'Woman',
	x = 'Unknown',
}

@Entity({
	orderBy: {
		username: 'ASC', //升序
	},
})
export class User extends BaseEntity {
	@Column()
	@Generated('uuid') //自动生成列
	id!: string;

	@Index()
	@PrimaryColumn({ unique: true, type: 'varchar', length: 50 })
	username!: string; //index

	@Column({ select: false, type: 'varchar', length: 100 })
	password!: string;

	@Column({ nullable: true })
	avatar!: string; //头像

	@Column({ nullable: true })
	backimage!: string; //背景图

	@Column({
		nullable: true,
		type: 'varchar',
		length: 50,
		charset: 'utf8mb4',
		comment: '心情',
	})
	mood!: string;

	@Column({
		type: 'varchar',
		length: 30,
		charset: 'utf8mb4',
		comment: '名字',
	})
	name!: string;

	@Column({
		type: 'enum',
		enum: Gender,
		default: Gender.x,
		comment: '性别',
	})
	gender!: Gender; //性别 enum

	@Column({
		nullable: true,
		charset: 'utf8mb4',
		type: 'varchar',
		length: 200,
		comment: '地址',
	})
	address!: string;

	@Column({
		comment: '积分',
	})
	bp!: number;

	@CreateDateColumn()
	createdate!: Date;

	@UpdateDateColumn()
	updatedate!: Date;

	@VersionColumn()
	version!: number;
}
