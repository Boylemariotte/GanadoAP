export interface Sale {
    id?: string;
    _id?: string;
    productId: string;
    productName: string;
    breed?: string;
    weight?: number;
    images?: string[];
    buyerName: string;
    buyerPhone: string;
    buyerEmail?: string;
    buyerAddress?: string;
    saleDate: string;
    salePrice: number;
    paymentMethod: 'cash' | 'transfer' | 'check' | 'card';
    deliveryMethod: 'pickup' | 'delivery';
    deliveryDate?: string;
    deliveryAddress?: string;
    observations?: string;
    sellerName?: string;
    sellerContact?: string;
    timestamp?: string;
}
