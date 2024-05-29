/* eslint-disable prettier/prettier */
import { UserEntity } from "src/auth/models/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('notification')
export class NotificationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.notificationsSent)
    creator: UserEntity;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.notificationsReceive)
    receiver: UserEntity;

    @Column()
    postId: number;

    @Column()
    isRead: boolean;
}