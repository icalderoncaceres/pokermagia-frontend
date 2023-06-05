
import { BASE_URL } from '../../helpers/config';
import { IGetConfigResponse, IUpdateConfigRequest, IUpdateConfigResponse } from './ConfigService.model';
import {callApi} from '../http';

export const getConfig = async(): Promise<IGetConfigResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/config/get`);
        return response.json();   
    } catch (error) {
        throw new Error('Error en player-get');
    }
}

export const updateConfig = async(payload: IUpdateConfigRequest): Promise<IUpdateConfigResponse> => {
    const {id, ...data} = payload.config;
    return await callApi(`${BASE_URL}/api/v1/config/update`, data, 'POST', 'approved');
}
