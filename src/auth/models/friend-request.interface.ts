/* eslint-disable prettier/prettier */
import { User } from "./user.interface";
export type FriendRequest_Status = 'pending' | 'accepted' | 'declined'

export interface FriendRequestStatus {
    status?: FriendRequest_Status;
}

export class FriendRequest {
    id?: number;
    creator?: User;
    receiver?: User;
    status?: FriendRequest_Status;
}