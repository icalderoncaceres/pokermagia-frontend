
import {
    IGetRegisterRequest,
    IGetRegisterResponse,
    ISaveRegisterRequest,
    ISaveRegisterResponse,
    IGetListRegisterRequest,
    IGetListRegisterResponse,
    IGetMonthlyRequest,
    IGetMonthlyResponse,
    ISaveMonthlyRequest,
    ISaveMonthlyResponse
} from './RegisterService.model';
import {BASE_URL} from '../../helpers/config';
import { callApi } from '../http';

export const get = async (payload: IGetRegisterRequest): Promise<IGetRegisterResponse> => {
    const data = {
        day: payload.day,
        month: payload.month,
        userId: payload.userId,
        room: payload.room
    }
    return await callApi(`${BASE_URL}/api/v1/registers/get`, data, 'POST', 'getList');

}

export const getList = async (payload: IGetListRegisterRequest): Promise<IGetListRegisterResponse> => {
    const data = {
        userId: payload.userId,
        room: payload.room
    }
    return await callApi(`${BASE_URL}/api/v1/registers/getList`, data, 'POST', 'getList');
}

export const save = async (payload: ISaveRegisterRequest): Promise<ISaveRegisterResponse> => {
    const data = {
        userId: payload.userId,
        room: payload.room,
        bank: payload.data.bank,
        hands: payload.data.hands,
        comodin: payload.data.comodin,
        day: payload.data.day,
        month: payload.data.month,
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        image5: '',
    }
    if (payload.images) {
        payload.images.forEach((img: {id: string, b64: string}, index: number) => {
            switch(index) {
                case 0:
                    data.image1 = img.b64;
                    break;
                case 1:
                    data.image2 = img.b64;
                    break;
                case 2:
                    data.image3 = img.b64;
                    break;
                case 3:
                    data.image4 = img.b64;
                    break;
                case 4:
                    data.image5 = img.b64;
                    break;
                default:
                    break;
            }
        });
    }
    return await callApi(`${BASE_URL}/api/v1/registers/saveRegister`, data, 'POST', 'saveRegister');
}

export const getMonthly = async (payload: IGetMonthlyRequest): Promise<IGetMonthlyResponse> => {
    const data = {
        userId: payload.userId,
        room: payload.room,
        month: payload.month
    }
    return await callApi(`${BASE_URL}/api/v1/registers/getMonthly`, data, 'POST', 'getMonthly');
}

export const saveMonthly = async (payload: ISaveMonthlyRequest): Promise<ISaveMonthlyResponse> => {
    const data = {
        userId: payload.userId,
        room: payload.room,
        month: payload.month,
        week1: payload.data[0].comodin,
        week2: payload.data[1].comodin,
        week3: payload.data[2].comodin,
        week4: payload.data[3].comodin,
        week5: payload.data[4] ? payload.data[4].comodin : 0,
        week6: payload.data[5] ? payload.data[5].comodin : 0
    }
    return await callApi(`${BASE_URL}/api/v1/registers/saveMonthly`, data, 'POST', 'saveMonthly');
}
