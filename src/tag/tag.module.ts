/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TagEntity } from './models/tag.entity';
import { TagService } from './services/tag/tag.service';
import { TagController } from './controllers/tag/tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/newfeed/models/post.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([TagEntity, PostEntity])
  ],
  providers: [TagService],
  controllers: [TagController]
})
export class TagModule {}
