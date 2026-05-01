import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Order } from '../types';


function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        async function fetchOrders() {
            const response = await fetch('/api/orders');
            const data = await response.json();
            setOrders(data);
        }

        fetchOrders();
    }, []);

return (
    <section>
        <h2>Order History</h2>
        {orders.map((order) => (
            <div key={order.id}>
                <Link to={`/orders/${order.id}`}>Order #{order.id} - {order.status}</Link>
            </div>
        ))}

    </section>
    
);
}

export default Orders;