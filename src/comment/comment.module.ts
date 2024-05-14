import { Module } from '@nestjs/common';
import { CommentController } from './controllers/comment/comment.controller';
import { CommentService } from './services/comment/comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './models/comment.entity';
import { PostEntity } from 'src/newfeed/models/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, PostEntity])
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
