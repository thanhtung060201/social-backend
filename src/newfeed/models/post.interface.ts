/* eslint-disable prettier/prettier */
import { User } from "src/auth/models/user.interface";

export interface NewFeedPost {
  id?: number;
  body?: string;
  imagePath?: string;
  createdAt?: Date;
  author?: User;
}
