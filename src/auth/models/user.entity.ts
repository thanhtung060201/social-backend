/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";
import { PostEntity } from "src/newfeed/models/post.entity";
import { CommentEntity } from "src/comment/models/comment.entity";
import { FriendRequestEntity } from "./friend-request.entity";
import { ConversationEntity } from "src/chat/models/conversation.entity";
import { MessageEntity } from "src/chat/models/message.entity";
import { NotificationEntity } from "src/notification/models/notification.entity";

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

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    education: string;

    @Column({ nullable: true })
    dob: Date;

    @Column({ nullable: true })
    gender: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;

    @OneToMany(() => PostEntity, (postEntity) => postEntity.author)
    newFeedPosts: PostEntity[];

    @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.author)
    comments: CommentEntity[];

    @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.author)
    favorites: CommentEntity[];

    @OneToMany(() => FriendRequestEntity, (friendRequestEntity) => friendRequestEntity.creator)
    sentFriendRequests: FriendRequestEntity[];

    @OneToMany(() => FriendRequestEntity, (friendRequestEntity) => friendRequestEntity.receiver)
    receivedFriendRequests: FriendRequestEntity[];

    @ManyToMany(
        () => ConversationEntity,
        (conversationEntity) => conversationEntity.users,
    )
    conversations: ConversationEntity[];

    @OneToMany(() => MessageEntity, (messageEntity) => messageEntity.user)
    messages: MessageEntity[];

    @OneToMany(() => NotificationEntity, (notificationEntity) => notificationEntity.creator)
    notificationsSent: NotificationEntity[];

    @OneToMany(() => NotificationEntity, (notificationEntity) => notificationEntity.receiver)
    notificationsReceive: NotificationEntity[];
}