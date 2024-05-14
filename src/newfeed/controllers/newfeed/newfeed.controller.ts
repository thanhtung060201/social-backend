/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { NewfeedService } from 'src/newfeed/services/newfeed/newfeed.service';
import { PostModel } from 'src/newfeed/models/post.model';
import { map, Observable, of, switchMap } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveImageToStorage } from 'src/auth/helpers/image-storage';
import { TagModel } from 'src/tag/models/tag.model';

@Controller('newfeed')
export class NewfeedController {

    constructor(private newfeedService: NewfeedService) {}

    @UseGuards(JwtGuard)
    @Post()
    createPost(@Body() data: { post: PostModel, tags: TagModel[]}, @Request() req): Observable<PostModel> {
        return this.newfeedService.createPost(req.user, data.post, data.tags);
    }

    @UseGuards(JwtGuard)
    @Get()
    getAllPost(@Request() req): Observable<PostModel[]> {
        return this.newfeedService.getAllPost(req.user);
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
    @Put('like/:id')
    updateLikeByPostId(
        @Param('id') id: number,
        @Body() post: PostModel
    ): Observable<UpdateResult> {
        return this.newfeedService.updateLikeByPostId(id, post);
    }

    @UseGuards(JwtGuard)
    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file', saveImageToStorage))
    uploadImage(
        @UploadedFile() file: Express.Multer.File,
        @Param('id') id: any
    ): Observable<{ modifiedFileName: string } | { error: string }> {
        console.log(id);
        const fileName = file?.filename;

        if (!fileName) return of({error: 'File must be a png, jpg/jpeg'});

        // const imagesFolderPath = join(process.cwd(), 'images');
        // const fullImagePath = join(imagesFolderPath + '/' + file.filename);

        const postId = +id;
        return this.newfeedService.updatePostImageById(postId, fileName).pipe(
            map(() => ({
                modifiedFileName: file.filename,
            })),
        );
    }

    @UseGuards(JwtGuard)
    @Get('image/:id')
    findImage(@Param('id') id: any, @Res() res): Observable<object> {
        const postId = id;
        return this.newfeedService.findImageNameByPostId(postId).pipe(
            switchMap((imageName: string) => {
                return of(res.sendFile(imageName, {root: './images'}));
            }),
        );
    }

    @UseGuards(JwtGuard)
    @Get('image-name/:id')
    findPostImageName(@Param('id') id: any): Observable<{ imageName: string }> {
        const postId = id;
        return this.newfeedService.findImageNameByPostId(postId).pipe(
            switchMap((imageName: string) => {
                return of({imageName});
            }),
        );
    }
}
