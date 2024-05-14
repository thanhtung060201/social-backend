import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { UserEntity } from 'src/auth/models/user.entity';
import { User } from 'src/auth/models/user.interface';
import { CommentEntity } from 'src/comment/models/comment.entity';
import { CommentModel } from 'src/comment/models/comment.interface';
import { PostEntity } from 'src/newfeed/models/post.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>
    ) {

    }

    async createComment(user: UserEntity, postId: number, content: string) {
        const post = await this.postRepository.findOne({
            where: { id: postId }
        });
        

        if (!post) {
            throw new Error('Post not found');
        }

        const newComment = new CommentEntity();
        newComment.content = content;
        newComment.author = user;
        newComment.post = post;

        return from(this.commentRepository.save(newComment));
    }

    updateComment(id: number, comment: CommentModel): Observable<UpdateResult> {
        return from(this.commentRepository.update(id, comment));
    }

    deleteComment(id: number): Observable<DeleteResult> {
        return from(this.commentRepository.delete(id));
    }
}
