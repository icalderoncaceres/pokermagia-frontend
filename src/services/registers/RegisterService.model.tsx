

interface IRegisterData {
    day: number
    month: number
    bank: number
    hands: number
    comodin: number
    image1: string
    image2: string
    image3: string
    image4: string
    image5: string
}

export interface IGetRegisterRequest {
    userId: number
    room: string
    day: number
    month: number
}

export interface IGetRegisterResponse {
    status: number
    data?: IRegisterData
    errors? : string[]
}

export interface ISaveRegisterRequest {
    userId: number
    room: string
    data: IRegisterData,
    images?: {id: string, b64: string}[]
}

export interface ISaveRegisterResponse {
    status: number
    bank: number
    hands: number
    comodin: number
    errors?: string[]
}

export interface IGetListRegisterRequest {
    userId: number
    room: string
}

export interface IGetListRegisterResponse {
    status: number
    list?: IRegisterData[]
    errors? : string[]
}

export interface IGetMonthlyRequest {
    userId: number
    month: number
    room: string
}

export interface IGetMonthlyResponse {
    status: number
    data?: {month: number, week1: number, week2: number, week3: number, week4: number, week5: number, week6: number}
    errors?: string[]
}

export interface ISaveMonthlyRequest {
    userId: number
    month: number
    data: {
        week: number,
        comodin: number
    }[]
    room: string
}

export interface ISaveMonthlyResponse {
    status: number
    error?: string[]
}
