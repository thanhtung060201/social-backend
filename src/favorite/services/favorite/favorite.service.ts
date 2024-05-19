/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { UserEntity } from 'src/auth/models/user.entity';
import { FavoriteEntity } from 'src/favorite/models/favorite.entity';
import { FavoriteModel } from 'src/favorite/models/favorite.interface';
import { PostEntity } from 'src/newfeed/models/post.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(FavoriteEntity)
        private readonly favoriteRepository: Repository<FavoriteEntity>,
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>
    ) {

    }

    async getFavoriteByPostId(postId: any) {
        const queryBuilder = this.favoriteRepository.createQueryBuilder('favorite');

        queryBuilder.where('favorite.postId = :postId', { postId });

        queryBuilder.leftJoinAndSelect('favorite.author', 'author');
      
        return await queryBuilder.getMany();
    }

    async createFavorite(user: UserEntity, postId: number) {
        const post = await this.postRepository.findOne({
            where: { id: postId }
        });
        

        if (!post) {
            throw new Error('Post not found');
        }

        const newFavorite = new FavoriteEntity();
        newFavorite.userId = user.id;
        newFavorite.author = user;
        newFavorite.post = post;

        return from(this.favoriteRepository.save(newFavorite));
    }

    deleteFavorite(id: number): Observable<DeleteResult> {
        return from(this.favoriteRepository.delete(id));
    }
}
