/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { User } from 'src/auth/models/user.interface';
import { PostEntity } from 'src/newfeed/models/post.entity';
import { PostModel } from 'src/newfeed/models/post.model';
import { TagModel } from 'src/tag/models/tag.model';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class NewfeedService {

    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>
    ) {

    }

    createPost(user: User, post: PostModel, tags: TagModel[]): Observable<PostModel> {
        post.author = user;
        post.tags = tags;
        return from(this.postRepository.save(post));
    }

    getAllPost(user: User): Observable<PostModel[]> {
        return from(this.postRepository.find({
            where: { author: user },
            relations: ['author', 'comments', 'tags'],
        }));
    }

    updatePost(id: number, post: PostModel): Observable<UpdateResult> {
        return from(this.postRepository.update(id, post));
    }

    deletePost(id: number): Observable<DeleteResult> {
        return from(this.postRepository.delete(id));
    }

    updateLikeByPostId(id: number, post: PostModel) {
        return from(this.postRepository.update(id, {
            totalLike: post.totalLike ? post.totalLike++ : 1
        }));
    }

    updatePostImageById(id: number, imagePath: string): Observable<UpdateResult> {
        const post: PostModel = new PostEntity();
        post.id = id;
        post.imagePath = imagePath;

        return from(this.postRepository.update(id, post));
    }

    findImageNameByPostId(id: number): Observable<string> {
        return from(this.postRepository.findOne({
            where: { id }
        })).pipe(
            map((post: PostModel) => {
                return post.imagePath;
            }),
        );
    }
}
