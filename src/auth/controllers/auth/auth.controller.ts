/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from 'src/auth/models/user.interface';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { UpdateResult } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  register(@Body() user: User): Observable<User> {
    return this.authService.registerAccount(user);
  }

  @Post('login')
  login(@Body() user: User): Observable<{ token: string }> {
    return this.authService
      .login(user)
      .pipe(map((jwt: string) => ({ token: jwt })));
  }

  @Put('change-password/:id')
  updatePost(
    @Param('id') id: number,
    @Body() user: User
  ): Observable<UpdateResult> {
    return this.authService.changePassword(id, user);
  }
}
