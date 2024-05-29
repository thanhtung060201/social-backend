/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import { FriendRequestEntity } from 'src/auth/models/friend-request.entity';
import { User } from 'src/auth/models/user.interface';
import { PostEntity } from 'src/newfeed/models/post.entity';
import { PostModel } from 'src/newfeed/models/post.model';
import { TagModel } from 'src/tag/models/tag.model';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class NewfeedService {

    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
        @InjectRepository(FriendRequestEntity)
        private readonly friendRequestRepository: Repository<FriendRequestEntity>,
    ) {

    }

    getAllPostWithFriend(currentUser: User) {
        return from(
            this.friendRequestRepository.find({
                where: [
                    { creator: currentUser, status: 'accepted' },
                    { receiver: currentUser, status: 'accepted' },
                ],
                relations: ['creator', 'receiver'],
            }),
        ).pipe(
            switchMap(async (friends: any[]) => {
                let userIds: number[] = [];

                friends.forEach((friend: any) => {
                    if (friend.creator.id) {
                        userIds.push(friend.receiver.id);
                    } 
                    if (friend.receiver.id) {
                        userIds.push(friend.creator.id);
                    }
                });

                userIds = Array.from(new Set(userIds));
                console.log(userIds);

                const posts = this.postRepository.find({
                    relations: ['author', 'comments', 'favorites', 'tags'],
                });

                const newPost = (await posts).map((post) => ({
                    ...post,
                    userIds: userIds
                }));

                return newPost;
            }),
        );
    }

    createPost(user: User, post: PostModel, tags: TagModel[]): Observable<PostModel> {
        post.author = user;
        post.tags = tags;
        return from(this.postRepository.save(post));
    }

    getPostById(postId: number): Observable<PostModel> {
        return from(this.postRepository.findOne({
            where: { id: postId },
            relations: ['author', 'comments', 'favorites', 'tags'],
        }));
    }

    async getPostByUserId(authorId: number) {
        const queryBuilder = this.postRepository.createQueryBuilder('post');

        queryBuilder.where('post.authorId = :authorId', { authorId });

        queryBuilder.leftJoinAndSelect('post.author', 'author');
        queryBuilder.leftJoinAndSelect('post.comments', 'comments');
        queryBuilder.leftJoinAndSelect('post.favorites', 'favorites');

        return await queryBuilder.getMany();
    }

    async getPostByTagName(tagId: string) {
        const queryBuilder = this.postRepository.createQueryBuilder('post');

        queryBuilder.where('post.tagId = :tagId', { tagId });

        queryBuilder.leftJoinAndSelect('post.author', 'author');
        queryBuilder.leftJoinAndSelect('post.comments', 'comments');
        queryBuilder.leftJoinAndSelect('post.favorites', 'favorites');

        return await queryBuilder.getMany();
    }

    getAllPost(user: User): Observable<PostModel[]> {
        return from(this.postRepository.find({
            where: { author: user },
            relations: ['author', 'comments', 'favorites', 'tags'],
        }));
    }

    updatePost(post: PostModel): Observable<any> {
        return from(this.postRepository.save(post));
    }

    deletePost(id: number): Observable<DeleteResult> {
        return from(this.postRepository.delete(id));
        // return from(this.postRepository.delete(id));
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
