import api from '../api/api';
import { Sale } from '../types/sale';

export const getSales = async (): Promise<Sale[]> => {
    const response = await api.get('/sales');
    return response.data;
};

export const createSale = async (saleData: Sale): Promise<Sale> => {
    const response = await api.post('/sales', saleData);
    return response.data;
};
