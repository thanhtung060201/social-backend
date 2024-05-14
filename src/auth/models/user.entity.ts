/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";
import { PostEntity } from "src/newfeed/models/post.entity";
import { CommentEntity } from "src/comment/models/comment.entity";
import { FriendRequestEntity } from "./friend-request.entity";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ nullable: true })
    imagePath: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;

    @OneToMany(() => PostEntity, (postEntity) => postEntity.author)
    newFeedPosts: PostEntity[];

    @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.author)
    comments: CommentEntity[];

    @OneToMany(() => FriendRequestEntity, (friendRequestEntity) => friendRequestEntity.creator)
    sentFriendRequests: FriendRequestEntity[];

    @OneToMany(() => FriendRequestEntity, (friendRequestEntity) => friendRequestEntity.receiver)
    receivedFriendRequests: FriendRequestEntity[];
}