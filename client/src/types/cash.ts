export interface CashMovement {
    _id?: string;
    category: 'inicio' | 'gasto';
    concept: string;
    amount: number;
    totalBills: number;
    totalCoins: number;
    createdAt?: string;
    updatedAt?: string;
}
