
export interface IGetSumaryResponse {
    status: number
    data?: {
        balance: number
        hands: number
        players: number
        bank: number
        recharges: number
        rollStart: number
    }
    errors?: string[]
}

export interface IConsolidate {
    id?: number
    playerId: number
    playerName: string
    rollStart: number
    room: string
    level: string
    recharges: number
    bank: number
    hands: number
    comodin: number
    balance: number
    newRollstart?: number
}

export interface IGetConsolidateResponse {
    status: number
    players?: IConsolidate[]
    errors?: string[]
}

export interface ICloseMonthResponse {
    status: number
    errors?: string[]
}
