import {IUser} from "./IUser.ts";

export interface IUsersResponse {
    users: IUser[];
    total: number;
    skip: number;
    limit: number;
}