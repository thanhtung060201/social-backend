/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationEntity } from './models/conversation.entity';
import { ActiveConversationEntity } from './models/active-conversation.entity';
import { MessageEntity } from './models/message.entity';
import { ConversationService } from './services/conversation.service';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            ConversationEntity,
            ActiveConversationEntity,
            MessageEntity,
        ]),
    ],
    providers: [ChatGateway, ConversationService],
})
export class ChatModule { }