/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseGuards, Request, Put, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { FavoriteModel } from 'src/favorite/models/favorite.interface';
import { FavoriteService } from 'src/favorite/services/favorite/favorite.service';
import { DeleteResult } from 'typeorm';

@Controller('favorite')
export class FavoriteController {

    constructor(private favoriteService: FavoriteService) {}

    @UseGuards(JwtGuard)
    @Get(':id')
    getFavoriteByPostId(@Param('id') id: number) {
        return this.favoriteService.getFavoriteByPostId(id);
    }

    @UseGuards(JwtGuard)
    @Post()
    createFavorite(@Body() body: any, @Request() req) {
        return this.favoriteService.createFavorite(req.user, body.postId);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    deleteComment(@Param('id') id: number): Observable<DeleteResult> {
        return this.favoriteService.deleteFavorite(id);
    }
}
