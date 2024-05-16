/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { TagModel } from 'src/tag/models/tag.model';
import { TagService } from 'src/tag/services/tag/tag.service';

@Controller('tag')
export class TagController {

    constructor(private tagService: TagService) {}

    @UseGuards(JwtGuard)
    @Get()
    getAllTags(): Observable<TagModel[]> {
        return this.tagService.getAllTags();
    }

    @UseGuards(JwtGuard)
    @Post()
    createTags(@Body() data: { postId: number, name: string }) {
        return this.tagService.createTags(data.name, data.postId);
    }
}
