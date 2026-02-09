import { Livestock } from '../types/livestock';

const API_URL = 'http://localhost:5000/api/livestock';

export const getLivestock = async (): Promise<Livestock[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch livestock');
    }
    return response.json();
};

export const getLivestockById = async (id: string): Promise<Livestock> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch livestock details');
    }
    return response.json();
};

export const createLivestock = async (livestock: Partial<Livestock> | FormData): Promise<Livestock> => {
    const isFormData = livestock instanceof FormData;

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: isFormData ? {} : {
            'Content-Type': 'application/json',
        },
        body: isFormData ? livestock : JSON.stringify(livestock),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create livestock');
    }
    return response.json();
};
