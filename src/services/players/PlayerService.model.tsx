
import { IUser } from '../users/UserService.model';
/****************** ENTITIES INTERFACES *******/
interface IPlayer extends IUser {
    name: string
    last_name: string
    room: string
    email: string
    level: string
    phone: string
    country: string
    notes: string
}

export interface ICreatePlayerRequest {
    player: Partial<IPlayer>
}

export interface ICreatePlayerResponse {
    status: number
    player?: IPlayer
    errors?: string[]
}

export interface IGetPlayerRequest {
    id: number
}

export interface IGetPlayerResponse {
    status: number
    player?: IPlayer
    errors?: string[]
}

export interface IIndexPlayerRequest {
    filter?: {
        str: string
    }
}

export interface IIndexPlayerResponse {
    status: number
    players?: IPlayer[]
    errors?: string[]
}

export interface IUpdatePlayerRequest {
    id: number
    player: Partial<IPlayer>
}

export interface IUpdatePlayerResponse {
    status: number
    players?: IPlayer
    errors?: string[]
}

export interface IRemovePlayerRequest {
    id: number
}

export interface IRemovePlayerResponse {
    status: number
    errors?: string[]
}
