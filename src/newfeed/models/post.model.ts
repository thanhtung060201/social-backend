/* eslint-disable prettier/prettier */

import { User } from "src/auth/models/user.interface";
import { CommentModel } from "src/comment/models/comment.interface";
import { TagModel } from "src/tag/models/tag.model";

export interface PostModel {
  id?: number;
  body?: string;
  imagePath?: string;
  isDeleted?: boolean;
  createdAt?: Date;
  author?: User;
  comments?: CommentModel[];
  totalLike?: number;
  tags?: TagModel[];
}
