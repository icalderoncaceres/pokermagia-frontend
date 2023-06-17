
export interface IGetSumaryResponse {
    status: number
    data?: {
        balance: {
            dolar: number,
            euro: number
        },
        hands: number
        players: {
            partyPoker: number,
            ggPoker: number,
            fabianPichara: number
        },
        bank: {
            dolar: number,
            euro: number
        },
        recharges: {
            dolar: number,
            euro: number
        },
        rollStart: {
            dolar: number,
            euro: number
        }
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
