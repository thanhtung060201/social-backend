import { User } from "./user.interface";

/* eslint-disable prettier/prettier */
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