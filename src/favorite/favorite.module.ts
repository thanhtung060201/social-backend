/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FavoriteService } from './services/favorite/favorite.service';
import { FavoriteController } from './controllers/favorite/favorite.controller';
import { FavoriteEntity } from './models/favorite.entity';
import { PostEntity } from 'src/newfeed/models/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteEntity, PostEntity])
  ],
  providers: [FavoriteService],
  controllers: [FavoriteController]
})
export class FavoriteModule {}
