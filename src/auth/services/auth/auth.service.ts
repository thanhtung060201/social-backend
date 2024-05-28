/* eslint-disable prettier/prettier */
import { MailerService } from '@nest-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { catchError, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { UserEntity } from 'src/auth/models/user.entity';
import { User } from 'src/auth/models/user.interface';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private jwtService: JwtService,
        private mailerService: MailerService
    ) {

    }

    hashPassword(password: string): Observable<string> {
        return from(bcrypt.hash(password, 12));
    }

    registerAccount(user: User): Observable<User> {
        const { firstName, lastName, email, password } = user;

        // return this.doesUserExist(email).pipe(
        //   tap((doesUserExist: boolean) => {
        //     if (doesUserExist)
        //       throw new HttpException(
        //         'A user has already been created with this email address',
        //         HttpStatus.BAD_REQUEST,
        //       );
        //   }),
        //   switchMap(() => {
        //     return this.hashPassword(password).pipe(
        //       switchMap((hashedPassword: string) => {
        //         return from(
        //           this.userRepository.save({
        //             firstName,
        //             lastName,
        //             email,
        //             password: hashedPassword,
        //           }),
        //         ).pipe(
        //           map((user: User) => {
        //             delete user.password;
        //             return user;
        //           }),
        //         );
        //       }),
        //     );
        //   }),
        // );

        return this.hashPassword(password).pipe(
            switchMap((hashedPassword: string) => {
                return from(
                    this.userRepository.save({
                        firstName,
                        lastName,
                        email,
                        password: hashedPassword,
                    }),
                ).pipe(
                    map((user: User) => {
                        delete user.password;
                        return user;
                    }),
                );
            }),
        );
    }

    validateUser(email: string, password: string): Observable<User> {
        return from(
            this.userRepository.findOne({
                where: { email },
                select: ['id', 'firstName', 'lastName', 'email', 'password', 'role']
            }),
        ).pipe(
            switchMap((user: User) => {
                if (!user) {
                    throw new HttpException(
                        { status: HttpStatus.FORBIDDEN, error: 'Tài khoản hoặc mật khẩu không đúng' },
                        HttpStatus.FORBIDDEN,
                    );
                }
                return from(bcrypt.compare(password, user.password)).pipe(
                    map((isValidPassword: boolean) => {
                        if (isValidPassword) {
                            delete user.password;
                            return user;
                        }
                    }),
                );
            }),
        );
    }

    login(user: User): Observable<string> {
        const { email, password } = user;
        return this.validateUser(email, password).pipe(
            switchMap((user: User) => {
                if (user) {
                    return from(this.jwtService.signAsync({ user }));
                }
            }),
        );
    }

    changePassword(id: number, user: User): Observable<UpdateResult> {
        const password = user.password;
        return this.hashPassword(user.password).pipe(
            switchMap((hashedPassword: string) => {
                this.mailerService.sendMail({
                    to: 'thanhtung060201@gmail.com',
                    from: 'Asdfasdf@gmail.com',
                    subject: 'Đổi mật khẩu',
                    text: 'Chào Thanh Tùng',
                    html: `Bạn đã đổi mật khẩu mới thành <b>${{ password }}</b> vào lúc <b>${new Date()}</b>`
                })
                return from(
                    this.userRepository.update(id, {
                        ...user,
                        password: hashedPassword,
                    }),
                )
            }),
        );
    }

    getJwtUser(jwt: string): Observable<User | null> {
        return from(this.jwtService.verifyAsync(jwt)).pipe(
            map(({ user }: { user: User }) => {
                return user;
            }),
            catchError(() => {
                return of(null);
            }),
        );
    }
}
