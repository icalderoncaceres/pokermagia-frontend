
export interface IAlert {
    id: number
    message: string
    state: boolean
}

export interface IGetAlertsRequest {
    userId: number
}

export interface IGetAlertsResponse {
    status: number
    alerts?: IAlert[]
    errors?: string[]
}

export interface IMarkOnRequest {
    id: number
}

export interface IMarkOnResponse {
    status: number
}