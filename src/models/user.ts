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
	// @Column({
	// 	type: 'enum',
	// 	enum: Gender,
	// 	default: Gender.x,
	// })
	// gender!: Gender; //性别 enum

	// @Column({
	// 	charset: 'utf8mb4',
	// 	type: 'varchar',
	// 	length: 200,
	// })
	// bio!: string; //简介

	// @CreateDateColumn()
	// createDate!: Date;

	// @UpdateDateColumn()
	// updateDate!: Date;

	// @VersionColumn()
	// version!: number;
}
