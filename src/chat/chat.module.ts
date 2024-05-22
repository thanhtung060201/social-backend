import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';

@Module({})
export class ChatModule {
    providers: [ChatGateway]
}