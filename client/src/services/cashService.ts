import api from '../api/api';
import { CashMovement } from '../types/cash';

const CASH_URL = '/cash';

export const getCashMovements = async (): Promise<CashMovement[]> => {
    const response = await api.get<CashMovement[]>(CASH_URL);
    return response.data;
};

export const createCashMovement = async (movement: Partial<CashMovement>): Promise<CashMovement> => {
    const response = await api.post<CashMovement>(CASH_URL, movement);
    return response.data;
};

export const updateCashMovement = async (id: string, movement: Partial<CashMovement>): Promise<CashMovement> => {
    const response = await api.put<CashMovement>(`${CASH_URL}/${id}`, movement);
    return response.data;
};

export const deleteCashMovement = async (id: string): Promise<void> => {
    await api.delete(`${CASH_URL}/${id}`);
};
