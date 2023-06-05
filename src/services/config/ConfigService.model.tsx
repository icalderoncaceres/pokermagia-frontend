
export interface IConfig {
    id: number
    nl2: number
    nl5: number
    nl10: number
    nl25: number
    nl50: number
    nl100: number
    nl510: number
    nl1025: number
    nl2550: number 
}

export interface IGetConfigResponse {
    status: number
    config?: IConfig
    errors?: string[]
}

export interface IUpdateConfigRequest {
    config: IConfig
}

export interface IUpdateConfigResponse {
    status: number
    errors?: string[]
}