/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { NewfeedService } from 'src/newfeed/services/newfeed/newfeed.service';
import { PostModel } from 'src/newfeed/models/post.model';
import { map, Observable, of, switchMap } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { join } from '@angular-devkit/core';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveImageToStorage } from 'src/auth/helpers/image-storage';

@Controller('newfeed')
export class NewfeedController {

    constructor(private newfeedService: NewfeedService) {

    }

    @UseGuards(JwtGuard)
    @Post()
    createPost(@Body() post: PostModel, @Request() req): Observable<PostModel> {
        return this.newfeedService.createPost(req.user, post);
    }

    @UseGuards(JwtGuard)
    @Get()
    getAllPost(): Observable<PostModel[]> {
        return this.newfeedService.getAllPost();
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    updatePost(
        @Param('id') id: number,
        @Body() post: PostModel
    ): Observable<UpdateResult> {
        return this.newfeedService.updatePost(id, post);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    deletePost(@Param('id') id: number): Observable<DeleteResult> {
        return this.newfeedService.deletePost(id);
    }

    @UseGuards(JwtGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', saveImageToStorage))
    uploadImage(
        @UploadedFile() file: Express.Multer.File,
        @Request() req,
    ): Observable<{ modifiedFileName: string } | { error: string }> {
        console.log(file);
        const fileName = file?.filename;

        if (!fileName) return of({error: 'File must be a png, jpg/jpeg'});

        // const imagesFolderPath = join(process.cwd(), 'images');
        // const fullImagePath = join(imagesFolderPath + '/' + file.filename);

        const postId = req.post.id;
        return this.newfeedService.updatePostImageById(postId, fileName).pipe(
            map(() => ({
                modifiedFileName: file.filename,
            })),
        );
    }

    @UseGuards(JwtGuard)
    @Get('image')
    findImage(@Request() req, @Res() res): Observable<object> {
        const postId = req.post.id;
        return this.newfeedService.findImageNameByPostId(postId).pipe(
            switchMap((imageName: string) => {
                return of(res.sendFile(imageName, {root: './images'}));
            }),
        );
    }

    @UseGuards(JwtGuard)
    @Get('image-name')
    findUserImageName(@Request() req): Observable<{ imageName: string }> {
        const postId = req.post.id;
        return this.newfeedService.findImageNameByPostId(postId).pipe(
            switchMap((imageName: string) => {
                return of({imageName});
            }),
        );
    }
}
