/* eslint-disable prettier/prettier */
import { Controller, Param, Post, UseGuards, Request, Body, Get} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/auth/models/user.interface';
import { NotificationService } from 'src/notification/services/notification/notification.service';
@Controller('notification')
export class NotificationController {

    constructor(private notificationService: NotificationService) {}

    @UseGuards(JwtGuard)
    @Post('sent/:receiverId')
    sendNotification(
      @Param('receiverId') receiverStringId: string,
      @Request() req,
      @Body() body
    ): Observable<any | { error: string }> {
      const receiverId = parseInt(receiverStringId);
      return this.notificationService.sendNotification(receiverId, req.user, body.type, body.postId);
    }

    @UseGuards(JwtGuard)
    @Get('getAll')
    getFriends(@Request() req): Observable<User[]> {
      return this.notificationService.getAllNotificationByUserId(req.user);
    }

}
