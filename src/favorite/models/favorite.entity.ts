/* eslint-disable prettier/prettier */
import { UserEntity } from "src/auth/models/user.entity";
import { PostEntity } from "src/newfeed/models/post.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('favorite')
export class FavoriteEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.comments)
    author: UserEntity;

    @ManyToOne(() => PostEntity, (postEntity) => postEntity.comments, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    post: PostEntity;

}