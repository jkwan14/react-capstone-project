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