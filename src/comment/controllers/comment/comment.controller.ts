/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CommentModel } from 'src/comment/models/comment.interface';
import { CommentService } from 'src/comment/services/comment/comment.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('comment')
export class CommentController {

    constructor(private commentService: CommentService) {}

    @UseGuards(JwtGuard)
    @Get(':id')
    getCommentByPostId(@Param('id') id: number) {
        return this.commentService.getCommentByPostId(id);
    }

    @UseGuards(JwtGuard)
    @Post()
    createComment(@Body() data: { postId: number, content: string }, @Request() req) {
        return this.commentService.createComment(req.user, data.postId, data.content);
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    updateComment(
        @Param('id') id: number,
        @Body() comment: CommentModel
    ): Observable<UpdateResult> {
        return this.commentService.updateComment(id, comment);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    deleteComment(@Param('id') id: number): Observable<DeleteResult> {
        return this.commentService.deleteComment(id);
    }
}
