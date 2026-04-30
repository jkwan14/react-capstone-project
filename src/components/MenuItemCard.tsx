import type { MenuItem } from '../types';
import { useCart } from '../context/CartContext';

type MenuItemCardProps = {
    item: MenuItem;
};

function MenuItemCard({ item }: MenuItemCardProps) {
    const { addToCart } = useCart();

    return (
        <article className='menu-card'>
            <img src={`${item.imageurl}`} alt={item.name} />
            <div className='menu-card-content'>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>{item.category}</p>
                <p>${item.price.toFixed(2)}</p>
                <p>Available: {item.available}</p>

                <button onClick={() => addToCart(item)}>Add to cart</button>
                
            </div>
        </article>
    );
} 

export default MenuItemCard;