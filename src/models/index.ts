export interface IUser {
    id?: number
    email: string
    password: string
    role: string
    name: string
    surname: string
    unique_id?: string
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IMessage {
    id: number;
    outgoing_id: string;
    incoming_id: string;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IInbox {
    id?: Number;
    last_message: string;
    last_message_user_id: string;
    inbox_holder_user_id: string;
    inbox_sender_user_id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IToken {
    token: string
}

export interface IPost {
    id: number;
    post_handler_type: string;
    post_handler_id: string;
    image: string;
    description: string;
    likes_amount: number;
    comments_amount: number;
    shares_amount: number;
    views_amount: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IAddInFriendsNotification {
    id: number;
    profile_from: string;
    profile_to: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IFriend {
    id: number;
    profile_from: string;
    profile_to: string;
    status: string;
}

export interface IGroup {
    id: number;
    group_name: string;
    image: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IGroupUsers {
    id: number;
    group_id: string;
    user_id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IComment {
    id: number;
    post_id: string;
    user_id: string;
    comment: string;
    likes_amount: number;
    createdAt: Date;
    updatedAt: Date;
} 