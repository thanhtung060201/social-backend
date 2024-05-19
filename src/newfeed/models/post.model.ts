/* eslint-disable prettier/prettier */

import { User } from "src/auth/models/user.interface";
import { CommentModel } from "src/comment/models/comment.interface";
import { FavoriteModel } from "src/favorite/models/favorite.interface";
import { TagModel } from "src/tag/models/tag.model";

export interface PostModel {
  id?: number;
  body?: string;
  imagePath?: string;
  createdAt?: Date;
  author?: User;
  comments?: CommentModel[];
  favorites?: FavoriteModel[];
  tags?: TagModel[];
}
