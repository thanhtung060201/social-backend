/* eslint-disable prettier/prettier */
import { UserEntity } from "src/auth/models/user.entity";
import { PostEntity } from "src/newfeed/models/post.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('comment')
export class CommentEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    content: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.comments)
    author: UserEntity

    @ManyToOne(() => PostEntity, (postEntity) => postEntity.comments)
    post: PostEntity

}