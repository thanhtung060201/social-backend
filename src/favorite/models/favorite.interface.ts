/* eslint-disable prettier/prettier */
import { User } from "src/auth/models/user.interface";
import { PostModel } from "src/newfeed/models/post.model";

export interface FavoriteModel {
  id?: number;
  userId?: number;
  createdAt?: Date;
  author?: User;
  post?: PostModel;
}
