/* eslint-disable prettier/prettier */
import { Controller, Post, UploadedFile, UseGuards, UseInterceptors, Request, Param, Get, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { map, Observable, of, switchMap } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { removeFile, saveImageToStorage } from 'src/auth/helpers/image-storage';
import { User } from 'src/auth/models/user.interface';
import { UserService } from 'src/auth/services/user/user.service';

@Controller('user')
export class UserController {
    
    constructor(private userService: UserService) {

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

        const imagesFolderPath = join(process.cwd(), 'images');
        const fullImagePath = join(imagesFolderPath + '/' + file.filename);

        const userId = req.user.id;
        return this.userService.updateUserImageById(userId, fileName).pipe(
            map(() => ({
                modifiedFileName: file.filename,
            })),
        );

        // return isFileExtensionSafe(fullImagePath).pipe(
        //     switchMap((isFileLegit: boolean) => {
        //         if (isFileLegit) {
        //             const userId = req.user.id;
        //             return this.userService.updateUserImageById(userId, fileName).pipe(
        //                 map(() => ({
        //                     modifiedFileName: file.filename,
        //                 })),
        //             );
        //         }
        //         removeFile(fullImagePath);
        //         return of({error: 'File content does not match extension!'});
        //     }),
        // );
    }

    @UseGuards(JwtGuard)
    @Get('image')
    findImage(@Request() req, @Res() res): Observable<object> {
        const userId = req.user.id;
        return this.userService.findImageNameByUserId(userId).pipe(
            switchMap((imageName: string) => {
                return of(res.sendFile(imageName, {root: './images'}));
            }),
        );
    }

    @UseGuards(JwtGuard)
    @Get('image-name')
    findUserImageName(@Request() req): Observable<{ imageName: string }> {
        const userId = req.user.id;
        return this.userService.findImageNameByUserId(userId).pipe(
            switchMap((imageName: string) => {
                return of({imageName});
            }),
        );
    }

    @UseGuards(JwtGuard)
    @Get(':userId')
    findUserById(@Param('userId') userStringId): Observable<User> {
        const userId = parseInt(userStringId);
        return this.userService.findUserById(userId);
    }
}
