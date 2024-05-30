/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { UserEntity } from 'src/auth/models/user.entity';
import { User } from 'src/auth/models/user.interface';
import { NotificationEntity } from 'src/notification/models/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(NotificationEntity)
        private readonly notificationRepository: Repository<NotificationEntity>,
    ) {

    }

    findUserById(id: number): Observable<User> {
        return from(
            this.userRepository.findOne({
                where: { id },
                relations: ['newFeedPosts']
            }),
        ).pipe(
            map((user: User) => {
                if (!user) {
                    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
                }
                delete user.password;
                return user;
            }),
        );
    }

    sendNotification(
        receiverId: number,
        creator: User,
        type: string,
        postId: string
    ): Observable<any | { error: string }> {
        if (receiverId === creator.id)
            return of({ error: 'Không thể gửi thông báo cho chính mình' });

        return this.findUserById(receiverId).pipe(
            switchMap((receiver: User) => {
                const notification: any = {
                    creator,
                    receiver,
                    type,
                    isRead: false,
                    postId
                };
                return from(this.notificationRepository.save(notification));
            }),
        );
    }

    getAllNotificationByUserId(
        currentUser: User,
    ): Observable<any[]> {
        return from(
            this.notificationRepository.find({
                where: [{ receiver: currentUser }],
                relations: ['receiver', 'creator'],
            }),
        );
    }
}
