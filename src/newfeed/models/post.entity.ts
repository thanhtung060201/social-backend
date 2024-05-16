/* eslint-disable prettier/prettier */
import { UserEntity } from "src/auth/models/user.entity";
import { CommentEntity } from "src/comment/models/comment.entity";
import { TagEntity } from "src/tag/models/tag.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('post')
export class PostEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    body: string;

    @Column({ nullable: true })
    imagePath: string;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.newFeedPosts)
    author: UserEntity;

    @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.post)
    comments: CommentEntity[];

    @OneToMany(() => TagEntity, (tagEntity) => tagEntity.post)
    tags: TagEntity[];

    @Column({ nullable: true })
    totalLike: number;

}