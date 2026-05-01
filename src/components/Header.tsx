import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
    const { cartItems } = useCart();
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className='header'>
            <h1>Jay's Restaurant</h1>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/checkout'>Checkout ({itemCount})</Link>
                <Link to='/orders'>Order History</Link>
                <Link to='/login'>Login</Link>

            </nav>
        </header>
    );
}
export default Header;