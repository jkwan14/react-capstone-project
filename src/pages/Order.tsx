import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Order } from '../types';


function Order() {

    const [order, setOrder] = useState<Ordeer | null>(null);
    const { orderId } = useParams();

    useEffect(() => {
        async function fetchOrder() {
            const reponse = await fetch(`/api/orders/${orderId}`);
            const data = await Response.json();
            setOrder(data);
        }
        fetchOrder();
    }, [orderId]);

    if (!order) {
        return <p>Loading receipt...</p>;
    }
return (
    <section>
    <h2>Receipt Page</h2>
    <p>Order ID: {order.id}</p>
    <p>Order time: {order.ordertime ? new Date(order.ordertime).toLocaleString() : 'Not available'}</p>
    <p>Area: {order.area}</p>
    <p>Location: {order.location}</p>
    <p>Tax: {order.tax.toFixed(2)}</p>
    <p>Tip: {order.tip.toFixed(2)}</p>
    <p>Status: {order.status}</p>
    </section>
);
}

export default Order;