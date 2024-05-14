/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { User } from 'src/auth/models/user.interface';
import { PostEntity } from 'src/newfeed/models/post.entity';
import { PostModel } from 'src/newfeed/models/post.model';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class NewfeedService {

    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>
    ) {

    }

    createPost(user: User, post: PostModel): Observable<PostModel> {
        post.author = user;
        return from(this.postRepository.save(post));
    }

    getAllPost(): Observable<PostModel[]> {
        return from(this.postRepository.find({
            relations: ['author'],
            select: ['id', 'body', 'imagePath', 'createdAt', 'author']
        }));
    }

    updatePost(id: number, post: PostModel): Observable<UpdateResult> {
        return from(this.postRepository.update(id, post));
    }

    deletePost(id: number): Observable<DeleteResult> {
        return from(this.postRepository.delete(id));
    }

    updatePostImageById(id: number, imagePath: string): Observable<UpdateResult> {
        const user: User = new PostEntity();
        user.id = id;
        user.imagePath = imagePath;

        return from(this.postRepository.update(id, user));
    }

    findImageNameByPostId(id: number): Observable<string> {
        return from(this.postRepository.findOne({
            where: { id }
        })).pipe(
            map((user: User) => {
                return user.imagePath;
            }),
        );
    }
}
