/* eslint-disable prettier/prettier */
import { UserEntity } from "src/auth/models/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('post')
export class PostEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    body: string;

    @Column({ nullable: true })
    imagePath: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.newFeedPosts)
    author: UserEntity

}