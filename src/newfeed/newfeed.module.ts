/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PostEntity } from './models/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewfeedController } from './controllers/newfeed/newfeed.controller';
import { NewfeedService } from './services/newfeed/newfeed.service';
import { FriendRequestEntity } from 'src/auth/models/friend-request.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([PostEntity, FriendRequestEntity])
  ],
  controllers: [NewfeedController],
  providers: [NewfeedService],
})
export class NewfeedModule {}
