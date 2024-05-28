/* eslint-disable prettier/prettier */

import { User } from "src/auth/models/user.interface";


export interface Conversation {
  id?: number;
  users?: User[];
  lastUpdated?: Date;
}