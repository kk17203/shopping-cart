import { Link } from "react-router-dom";
import { Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import { useState } from "react";
import RemoveIcon from "@material-ui/icons/Remove";

function CartPage() {
    // This useState uses a function to calculate its initial state, pulling cartProducts from local storage or (if no cartProducts stored) setting state to an empty array.
    const [cartProducts] = useState(() => {
        const storedCartProducts = localStorage.getItem("cartItems");
        return storedCartProducts ? JSON.parse(storedCartProducts) : [];
    });
    // This useState uses a function to calculate its initial state, pulling itemCount from local storage or (if no itemCount stored) setting state to 0.
    const [itemCount] = useState(() => {
        const storedItemCount = localStorage.getItem("itemCount");
        return storedItemCount ? parseInt(storedItemCount) : 0;
    });

    // This line checks to see if the current page is the cart page, and if so, adds a class of "highlighted" to the cart link in the nav bar.
    const isOnPage = location.pathname === "/cartpage";

    return (
        <div className="cart-container">
            <div className="nav-bar">
                <h1>Shopping Cart Project</h1>
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
            <div className="shop-card-container">
                {cartProducts.length === 0 ? (
                    <p>Empty</p>
                ) : (
                    cartProducts.map((item) => (
                        <div key={item.id} className="item-card">
                            <h3 className="item-title">{item.title}</h3>
                            <img src={item.image} alt="" className="item-img" />
                            <p className="item-price">${item.price}</p>
                            <p className="item-quantity">{item.quantity}</p>
                            <div className="btn-set">
                                <button className="remove-btn">
                                    {""}
                                    <RemoveIcon fontSize="small" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default CartPage;
