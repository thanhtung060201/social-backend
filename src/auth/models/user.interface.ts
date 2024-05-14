/* eslint-disable prettier/prettier */
import { Role } from "./role.enum";
import { CommentModel } from "src/comment/models/comment.interface";
import { PostModel } from "src/newfeed/models/post.model";


export class User {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    imagePath?: string;
    role?: Role;
    posts?: PostModel[];
    comments?: CommentModel[];
}