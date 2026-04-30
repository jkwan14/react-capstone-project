import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';



function Checkout() {
    const navigate = useNavigate();
    const { cartItems, clearCart, updateNotes, total } = useCart();

    if (cartItems.length === 0) {
        return (
            <section>
                <h2>Checkout</h2>
                <p>Your cart is empty.</p>
            </section>
        );
    }


async function handleSubmit(event: React.FormEvent) {
  event.preventDefault();

  const tax = total * 0.06;
  const tip = total * 0.20;

  try {
    const orderResponse = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: 3,
        ordertime: new Date().toISOString(),
        pickuptime: null,
        area: 'Theater 1',
        location: 'Table 37',
        tax,
        tip,
        pan: '4026664388908977',
        expiryMonth: 9,
        expiryYear: 2028,
        status: 'pending',
      }),
    });

    if (!orderResponse.ok) {
      throw new Error('Failed to create order');
    }

    const order = await orderResponse.json();

    const itemsResponse = await fetch(`/api/items/order/${order.id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        cartItems.map((item) => ({
          orderId: order.id,
          menuItemId: item.id,
          quantity: item.quantity,
          notes: item.notes,
          price: item.price,
        }))
      ),
    });

    if (!itemsResponse.ok) {
      throw new Error('Failed to add order items');
    }

    clearCart();
    navigate(`/orders/${order.id}`);
  } catch (error) {
    console.error(error);
  }
}
    return (
        <form onSubmit={handleSubmit}>
        <section>
                <h2>Checkout</h2>
                {cartItems.map((item) => (
                    <div key={item.id} className='checkout-item'>
                        <h3>{item.name}</h3>
                        <p>{item.quantity} * ${item.price.toFixed(2)}</p>
                        <label>
                            Special instructions:
                            <input value={item.notes} onChange={(event) => updateNotes(item.id, event.target.value)}
                            placeholder='Ex: Extra ketchup, no mayo'/>
                        </label>
                    </div>
                ))}
                <h3>Subtotal: ${total.toFixed(2)}</h3>
            </section>
            
                <button type='submit'>Place Order</button>
            </form>
    );
    }

export default Checkout;
