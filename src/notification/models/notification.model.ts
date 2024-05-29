/* eslint-disable prettier/prettier */

import { User } from "src/auth/models/user.interface";

export interface NotificationModel {
    id?: number;
    type?: string;
    creator?: User;
    receiver?: User;
    postId: number;
    isRead?: boolean;
}
