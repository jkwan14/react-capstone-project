import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Order, OrderItem, MenuItem } from '../types';

function Order() {

    const [order, setOrder] = useState<Order | null>(null);
    const { orderId } = useParams();
    const [items, setItems] = useState<OrderItem[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        async function fetchOrder() {
            const orderResponse = await fetch(`/api/orders/${orderId}`);
            const orderData = await orderResponse.json();
            setOrder(orderData);
        }
        fetchOrder();
    }, [orderId]);

    
    useEffect(() =>{
    async function fetchItems() {
            const itemsResponse = await fetch(`/api/items/order/${orderId}`);
            const itemsData = await itemsResponse.json();
            console.log(itemsData);
            setItems(itemsData);
        }
        fetchItems();
    }, [orderId]);

    useEffect(() => {
        async function fetchMenuItems() {
            const menuResponse = await fetch(`/api/menuitems`);
            const menuData = await menuResponse.json();
            setMenuItems(menuData);
        }
        fetchMenuItems();
    }, []);

    if (!order) {
        return <p>Loading receipt...</p>;
    }

    const groupedItems = items.reduce<Record<number, { itemid: number; quantity: number; price: number; notes: string }>>(

    (groups, item) => {
        if (!groups[item.itemid]) {
        groups[item.itemid] = {
        itemid: item.itemid,
        quantity: 0,
        price: item.price,
        notes: item.notes,
        };
    }

    groups[item.itemid].quantity += 1;
    return groups;
    },
    {}
);
 const receiptItems = Object.values(groupedItems);

 function getMenuItemName(itemid: number) {
    const match = menuItems.find((item) => item.id === itemid);
    return match ? match.name : `Item #${itemid}`;
 }

return (
    <section>
    <h2>Receipt Page</h2>
    <p>Order ID: {order.id}</p>
    <p>Order time: {order.ordertime ? new Date(order.ordertime).toLocaleString() : 'Not available'}</p>
    {/* <p>Area: {order.area}</p> */}
    {/* <p>Location: {order.location}</p> */}
    <p>Tax: ${order.tax.toFixed(2)}</p>
    <p>Tip: ${order.tip.toFixed(2)}</p>
    <p>Status: {order.status}</p>
    <h3>Items</h3>
    <ul>
        {receiptItems.map((item) => (
            <li key={item.itemid}>
                {item.quantity} x {getMenuItemName(item.itemid)} - (${item.price.toFixed(2)} each)
                {item.notes && <span> - Notes: { item.notes}</span>}
            </li>
        ))}
    </ul>
    </section>
);
}

export default Order;