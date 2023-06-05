
import { IUser } from '../users/UserService.model';

export interface IRecharge {
    id: number | string
    date: string
    player: number
    amount: number
    reason: string
    asker: number
    approver: number
    state: string
}

export interface IIndexRequest {
    filter?: {
        str: string
    }
}

export interface IIndexResponse {
    status: number
    list?: IRecharge[]
    errors?: string[] 
}

export interface ICreateRequest {
    recharge: Partial<IRecharge>
}

export interface ICreateResponse {
    status: number
    data?: IRecharge
    errors?: string[]    
}

export interface IGetRequest {
    id: number
}

export interface IGetResponse {
    status: number
    data?: IRecharge,
    errors?: string[]
}

export interface IApprovedRequest {
    id: number
    approver: number
    playerId: number
    amount: number
}

export interface IApprovedResponse {
    status: number
}
