import { useEffect, useState } from 'react';
import type { MenuItem } from '../types';
import MenuItemCard from '../components/MenuItemCard';


function Home() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        async function fetchMenuItems() {
            try {
                const response = await fetch('/api/menuitems');
                if (!response.ok) {
                    throw new Error('Failed to fetch menu items');
                }

                const data = await response.json();
                setMenuItems(data);
            } catch (err) {
                setError('Could not load menu items.');
            } finally {
                setIsLoading(false);
            }
        }
        fetchMenuItems();
    }, []);

    if (isLoading) {
        return <p>Loading menu...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
return (
    <section>
        <h2>Menu</h2>
        <div>
        {menuItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
            
        ))}
        </div>
    </section>
    
);
}

export default Home;