import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { OrderType } from '../types';


function Orders() {
    const [orders, setOrders] = useState<OrderType[]>([]);

    useEffect(() => {
        async function fetchOrders() {
            const response = await fetch('/api/orders');
            const data = await response.json();
            setOrders(data);
        }

        fetchOrders();
    }, []);

return (
    <section className='page-container'>
        <h2>Order History</h2>
        {orders.map((order) => (
            <div key={order.id}>
                <Link to={`/orders/${order.id}`}>Order #{order.id}</Link>
            </div>
        ))}

    </section>
    
);
}

export default Orders;