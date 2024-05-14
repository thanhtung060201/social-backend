/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PostEntity } from './models/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewfeedController } from './controllers/newfeed/newfeed.controller';
import { NewfeedService } from './services/newfeed/newfeed.service';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([PostEntity])
  ],
  controllers: [NewfeedController],
  providers: [NewfeedService],
})
export class NewfeedModule {}
