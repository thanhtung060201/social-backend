/* eslint-disable prettier/prettier */

import { User } from 'src/auth/models/user.interface';
import { Conversation } from './conversation.interface';

export interface Message {
  id?: number;
  message?: string;
  user?: User;
  conversation: Conversation;
  createdAt?: Date;
}