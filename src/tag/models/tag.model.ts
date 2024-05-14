/* eslint-disable prettier/prettier */

import { PostModel } from "src/newfeed/models/post.model";

export interface TagModel {
  id?: number;
  name?: string;
  post?: PostModel;
}
