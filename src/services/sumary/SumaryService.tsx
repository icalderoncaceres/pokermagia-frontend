
import { 
    IGetSumaryResponse,
    IGetConsolidateResponse,
    ICloseMonthResponse 
} from './SumaryService.model';
import {BASE_URL} from '../../helpers/config';
import { callApi } from '../http';

export const getSumary = async (): Promise<IGetSumaryResponse> => {
    return await callApi(`${BASE_URL}/api/v1/sumary/consolidation`, {}, 'POST', 'consolidation');
}

export const getConsolidate = async (): Promise<IGetConsolidateResponse> => {
    return await callApi(`${BASE_URL}/api/v1/sumary/getConsolidate`,{}, 'POST', 'getConsolidate');
}

export const closeMonth = async (): Promise<ICloseMonthResponse> => {
    return await callApi(`${BASE_URL}/api/v1/sumary/closeMonth`, {}, 'POST', 'closeMonth');
}

export const sendAlerts = async (): Promise<IGetConsolidateResponse> => {
    return await callApi(`${BASE_URL}/api/v1/sumary/sendAlerts`,{}, 'POST', 'sendAlerts');
}
