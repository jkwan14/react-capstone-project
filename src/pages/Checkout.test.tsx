import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Checkout from './Checkout';
import { CartProvider } from '../context/CartContext';

test('shows empty cart message', () => {
    render(
        <MemoryRouter>
          <CartProvider>
            <Checkout />
          </CartProvider>
        </MemoryRouter>
        
    );

    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
});