import api from '../api/api';
import { Livestock } from '../types/livestock';

const LIVESTOCK_URL = '/livestock';

export const getLivestock = async (): Promise<Livestock[]> => {
    const response = await api.get<Livestock[]>(LIVESTOCK_URL);
    return response.data;
};

export const getLivestockById = async (id: string): Promise<Livestock> => {
    const response = await api.get<Livestock>(`${LIVESTOCK_URL}/${id}`);
    return response.data;
};

export const createLivestock = async (livestock: Partial<Livestock> | FormData): Promise<Livestock> => {
    const isFormData = livestock instanceof FormData;

    const response = await api.post<Livestock>(LIVESTOCK_URL, livestock, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' }
    });

    return response.data;
};

export const updateLivestock = async (id: string, livestock: Partial<Livestock> | FormData): Promise<Livestock> => {
    const isFormData = livestock instanceof FormData;

    const response = await api.put<Livestock>(`${LIVESTOCK_URL}/${id}`, livestock, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' }
    });

    return response.data;
};
