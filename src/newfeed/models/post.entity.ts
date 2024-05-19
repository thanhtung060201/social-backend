/* eslint-disable prettier/prettier */
import { UserEntity } from "src/auth/models/user.entity";
import { CommentEntity } from "src/comment/models/comment.entity";
import { FavoriteEntity } from "src/favorite/models/favorite.entity";
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

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.newFeedPosts)
    author: UserEntity;

    @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.post)
    comments: CommentEntity[];

    @OneToMany(() => FavoriteEntity, (favoriteEntity) => favoriteEntity.post)
    favorites: FavoriteEntity[];

    @OneToMany(() => TagEntity, (tagEntity) => tagEntity.post, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    tags: TagEntity[];

}