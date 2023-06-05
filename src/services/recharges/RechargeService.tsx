
import {
    IIndexRequest,
    IIndexResponse,
    ICreateRequest,
    ICreateResponse,
    IGetRequest,
    IGetResponse,
    IApprovedRequest,
    IApprovedResponse
} from './Recharges.model';
import { BASE_URL } from '../../helpers/config';
import { callApi } from '../http';

export const index = async (payload: IIndexRequest): Promise<IIndexResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/recharges/index`);
        return response.json();        
    } catch (error) {
        throw new Error('Error en recharges-index');
    }
}

export const create = async (payload: ICreateRequest): Promise<ICreateResponse> => {
    const data = {
        player: payload.recharge.player || -1,
        reason: payload.recharge.reason || '',
        amount: payload.recharge.amount || 0,
        approver: payload.recharge.approver || '',
        asker: payload.recharge.asker || -1,
        date: payload.recharge.date || -1,
    }
    return await callApi(`${BASE_URL}/api/v1/recharges/create`, data, 'POST', 'create');
}

export const get = async (payload: IGetRequest): Promise<IGetResponse> => {
    const response = await fetch(`${BASE_URL}/api/v1/recharges/get/${payload.id}`);
    return response.json();
}

export const approved = async (payload: IApprovedRequest): Promise<IApprovedResponse> => {
    const data = {
        id: payload.id,
        approver: payload.approver,
        playerId: payload.playerId,
        amount: payload.amount
    }
    return await callApi(`${BASE_URL}/api/v1/recharges/approved`, data, 'POST', 'approved');
}

