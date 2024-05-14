/* eslint-disable prettier/prettier */

import { User } from "src/auth/models/user.interface";

export interface PostModel {
  id?: number;
  body?: string;
  imagePath?: string;
  createdAt?: Date;
  author?: User
}
