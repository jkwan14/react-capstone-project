export type MenuItem = {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    imageurl: string;
    available: boolean;
};

export type CartItem = MenuItem & {
    quantity: number;
    notes: string;
};

export type Order = {
    id: number;
    userId: number;
    ordertime: string | null;
    pickuptime: string | null;
    area: string;
    location: string;
    tax: number;
    tip: number;
    pan: string;
    expiryMonth: number;
    expiryYear: number;
    status: string;
};

export type OrderItem = {
    id: number;
    orderid: number;
    itemid: number;
    firstName: string;
    notes: string;
    price: number;
};