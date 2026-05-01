import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import MenuItemCard from './MenuItemCard';
import { CartProvider } from '../context/CartContext';
import userEvent from '@testing-library/user-event';

test('renders menu item info', () => {
    render(
        <CartProvider>
            <MenuItemCard 
            item={{
                id: 1,
                name: 'Burger',
                description: 'Test burger',
                category: 'entrees',
                price: 10,
                imageurl: '/test.jpg',
                available: true,
            }}/>
        </CartProvider>
    );
    expect(screen.getByText('Burger')).toBeInTheDocument();
    expect(screen.getByText('Test burger')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();

});

test('clicking Add to Cart works', async () => {
    const user = userEvent.setup();

    render(
        <CartProvider>
            <MenuItemCard 
            item={{
                id: 1,
                name: 'Burger',
                description: 'Test burger',
                category: 'entrees',
                price: 10,
                imageurl: '/images/food/burger_1.jpg',
                available: true,
            }}
            />
        </CartProvider>
    );
    
    
    await user.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();

});