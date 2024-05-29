/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification/notification.service';
import { NotificationController } from './controllers/notification/notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './models/notification.entity';
import { UserEntity } from 'src/auth/models/user.entity';
@Module({
  imports: [ 
    TypeOrmModule.forFeature([NotificationEntity, UserEntity])
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
