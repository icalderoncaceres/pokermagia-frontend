
import { 
    IGetAlertsRequest,
    IGetAlertsResponse,
    IMarkOnRequest,
    IMarkOnResponse 
} from './AlertsService.model';
import { BASE_URL } from '../../helpers/config';
import { callApi } from '../http';

export const getAlerts = async(payload: IGetAlertsRequest): Promise<IGetAlertsResponse> => {
    const data = {
        userId: payload.userId
    };
    return await callApi(`${BASE_URL}/api/v1/alerts/index`, data, 'POST', 'index');
}

export const markOn = async(payload: IMarkOnRequest): Promise<IMarkOnResponse> => {
    const data = {
        id: payload.id
    }
    return await callApi(`${BASE_URL}/api/v1/alerts/markOn`, data, 'POST', 'markOn');
}
