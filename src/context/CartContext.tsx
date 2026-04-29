import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CartItem, MenuItem } from '../types';

type CartContextType = {
    cartItems: CartItem[];
    addToCart: (item: MenuItem) => void;
    updateNotes: (id: number, notes: string) => void;
    clearCart: () => void;
    total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    function addToCart(item: MenuItem) {
        setCartItems((currentItems) => {
            const existingItem = currentItems.find((cartItem) => cartItem.id === item.id);

            if (existingItem) {
                return currentItems.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);

            }
            return [...currentItems, {
                ...item, quantity: 1, notes: ""
            }];
        });
    }

    function updateNotes(id: number, notes: string) {
        setCartItems((currentItems) => currentItems.map((item) => item.id === id ? { ...item, notes } : item));

    }

    function clearCart() {
        setCartItems([]);
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateNotes, clearCart, total }}>
            {children}
        </CartContext.Provider>

    );

}   

export function useCart() {
    const context = useContext(CartContext);
    
    if (!context) {
        throw new Error('useCart must be used inside a CartProvider');

    }
    return context;
}