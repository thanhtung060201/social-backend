/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { PostEntity } from 'src/newfeed/models/post.entity';
import { TagEntity } from 'src/tag/models/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>,
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>
    ) {}

    getAllTags(): Observable<TagEntity[]> {
        return from(this.tagRepository.find());
    }

    async createTags(name: string, postId: number) {
        const post = await this.postRepository.findOne({
            where: { id: postId }
        });
        

        if (!post) {
            throw new Error('Post not found');
        }

        const newTags = new TagEntity();
        console.log(newTags);
        newTags.name = name;
        newTags.post = post;

        return from(this.tagRepository.save(newTags));
    }
}
