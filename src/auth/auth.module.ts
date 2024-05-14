/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.stragery';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { FriendRequestEntity } from './models/friend-request.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '3600s' },
      }),
    }),
    TypeOrmModule.forFeature([UserEntity, FriendRequestEntity]),
  ],
  providers: [AuthService, JwtGuard, JwtStrategy, UserService],
  controllers: [AuthController, UserController],
  exports: [AuthService, UserService],
})
export class AuthModule {}
