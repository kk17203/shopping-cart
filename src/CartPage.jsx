import { Link } from "react-router-dom";
import { Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import { useEffect, useState } from "react";

function CartPage() {
    // This useState uses a function to calculate its initial state, pulling cartProducts from local storage or (if no cartProducts stored) setting state to an empty array.
    const [cartProducts, setCartProducts] = useState(() => {
        const storedCartProducts = localStorage.getItem("cartItems");
        return storedCartProducts ? JSON.parse(storedCartProducts) : [];
    });
    // This useState uses a function to calculate its initial state, pulling itemCount from local storage or (if no itemCount stored) setting state to 0.
    const [itemCount, setItemCount] = useState(() => {
        const storedItemCount = localStorage.getItem("itemCount");
        return storedItemCount ? parseInt(storedItemCount) : 0;
    });

    const [shopItems, setShopItems] = useState(() => {
        const storedShopItems = localStorage.getItem("shopItems");
        return storedShopItems ? JSON.parse(storedShopItems) : [];
    });

    const [total, setTotal] = useState(() => {
        const totalPrice = cartProducts.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        return totalPrice.toFixed(2);
    });

    useEffect(() => {
        if (shopItems) {
            const totalQuantity = shopItems.reduce(
                (total, item) => total + item.quantity,
                0
            );
            setItemCount(totalQuantity);
            localStorage.setItem("itemCount", JSON.stringify(totalQuantity));

            const cartItems = shopItems.filter((item) => item.quantity > 0);
            setCartProducts(cartItems);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));

            const totalPrice = shopItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );
            setTotal(totalPrice.toFixed(2));
        }
    }, [shopItems]);

    // This line checks to see if the current page is the cart page, and if so, adds a class of "highlighted" to the cart link in the nav bar.
    const isOnPage = location.pathname === "/cartpage";

    const handleRemove = (id) => {
        const updatedShopItems = shopItems.map((item) =>
            item.id === id
                ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
                : item
        );
        const updatedProducts = cartProducts.map((item) =>
            item.id === id
                ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
                : item
        );
        setShopItems(updatedShopItems);
        setCartProducts(updatedProducts);
        localStorage.setItem("shopItems", JSON.stringify(updatedShopItems));
        localStorage.setItem("cartItems", JSON.stringify(updatedProducts));
    };

    return (
        <div className="cart-container">
            <div className="nav-bar">
                <h1>Shopping Cart Project</h1>
                <div className="total">
                    <span>
                        Subtotal: <b>${total}</b>
                    </span>
                    <button className="checkout-btn">Checkout</button>
                </div>
                <ul>
                    <li>
                        <Link to="/">Home Page</Link>
                    </li>
                    <li>
                        <Link to="/shoppage">Shop Page</Link>
                    </li>
                    <li className={isOnPage ? "highlighted" : ""}>
                        <Link to="/cartpage">
                            <Badge badgeContent={itemCount} color="primary">
                                <ShoppingCartIcon />{" "}
                            </Badge>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="cart-card-container">
                {itemCount === 0 ? (
                    <p>Your shopping cart is empty</p>
                ) : (
                    cartProducts.map((item) => (
                        <div key={item.id} className="cart-item-card">
                            <img
                                src={item.image}
                                alt=""
                                className="cart-item-img"
                            />
                            <h3 className="cart-item-title">{item.title}</h3>
                            <p className="cart-item-price">
                                ${item.price.toFixed(2)}
                            </p>
                            <button
                                className="remove-btn-cart"
                                onClick={() => handleRemove(item.id)}
                            >
                                Remove Item
                                <p className="cart-item-quantity">
                                    Qty:
                                    {item.quantity}
                                </p>
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default CartPage;
