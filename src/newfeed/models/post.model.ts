/* eslint-disable prettier/prettier */

import { User } from "src/auth/models/user.interface";
import { CommentModel } from "src/comment/models/comment.interface";

export interface PostModel {
  id?: number;
  body?: string;
  imagePath?: string;
  createdAt?: Date;
  author?: User;
  comments?: CommentModel[];
  totalLike?: number;
}
