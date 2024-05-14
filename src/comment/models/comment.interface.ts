/* eslint-disable prettier/prettier */
import { User } from "src/auth/models/user.interface";
import { PostModel } from "src/newfeed/models/post.model";

export interface CommentModel {
  id?: number;
  content?: string;
  createdAt?: Date;
  author?: User;
  post?: PostModel;
}
