
/******************* ENUM *******************/

export enum ROLES {
    PLAYER = 'PLAYER',
    ADMIN = 'ADMIN',
    TEACHER = 'TEACHER',
    DEVELOPER = 'DEVELOPER'
}

/****************** ENTITIES INTERFACES *******/
export interface IUser {
    id: number
    name: string
    email: string
    last_name: string
    role: ROLES
    avatar: string
    password: string
    room: string
    state: string
}

/******** RQ AND RS FROM API ***************/
export interface ILoginUserRequest {
    email: string
    password: string
}

export interface ILoginUserResponse {
    status: number
    data?: {
        user: Partial<IUser>
        token: string
    }
    errors?: string[]
}

export interface IIndexUserRequest {
    filter?: {
        str?: string,
        role?: ROLES
    }
}

export interface IIndexUserResponse {
    status: number
    list?: IUser[]
    errors?: string[]
}

export interface IGetUserRequest {
    id: number
}

export interface IGetUserResponse {
    status: number
    user? : IUser
    errors?: string[]
}

export interface ICreateUserRequest {
    user: Partial<IUser>
}

export interface ICreateUserResponse {
    status: number
    user?: IUser
    errors?: string[]
}

export interface IUpdateUserRequest {
    user: IUser
}

export interface IUpdateUserResponse {
    status: number
    user?: IUser
    errors?: string[]
}

export interface IChangeStateUserRequest {
    userId: number
    state: number
}

export interface IChangeStateUserResponse {
    status: number
    errors?: string[]
}

export interface IAutoLoginUserRequest {
    token: string
    email: string
}

export interface IAutoLoginUserResponse {
    status: number
    data: {
        user?: IUser
        errors?: string[]
    }
}
