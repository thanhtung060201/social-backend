/* eslint-disable prettier/prettier */
import { PostEntity } from "src/newfeed/models/post.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tag')
export class TagEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    name: string;

    @ManyToOne(() => PostEntity, (postEntity) => postEntity.comments)
    post: PostEntity;

}