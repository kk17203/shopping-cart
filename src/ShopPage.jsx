import { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Link } from "react-router-dom";
import { Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";

function ShopPage() {
    const [shopItems, setShopItems] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [itemCount, setItemCount] = useState(() => {
        const storedItemCount = localStorage.getItem("itemCount");
        return storedItemCount ? parseInt(storedItemCount) : 0;
    });

    // Update localStorage whenever itemCount changes
    useEffect(() => {
        localStorage.setItem("itemCount", itemCount);
    }, [itemCount]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products", {
            mode: "cors",
        })
            .then((response) => response.json())
            .then((json) => setShopItems(json))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    if (error) return <p>A network error was encountered</p>;
    if (loading) return <p>Loading...</p>;

    return (
        <>
            <nav className="nav-bar">
                <h1>Shopping Cart Project</h1>
                <ul>
                    <li>
                        <Link to="/">Home Page</Link>
                    </li>
                    <li>
                        <Link to="/shoppage">Shop Page</Link>
                    </li>
                    <Link to="/cartpage">
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCartIcon />{" "}
                        </Badge>
                    </Link>
                </ul>
            </nav>
            <div className="shop-card-container">
                {shopItems.map((item) => (
                    <div key={item.id} className="item-card">
                        <h3 className="item-title">{item.title}</h3>
                        <img src={item.image} alt="" className="item-img" />
                        {/* <p className="item-desc">{item.description}</p> */}
                        <p className="item-price">${item.price}</p>
                        <p className="item-rating">
                            {item.rating.rate} out of {item.rating.count}
                        </p>
                        <div className="btn-set">
                            <button
                                className="remove-btn"
                                onClick={() =>
                                    setItemCount(Math.max(itemCount - 1, 0))
                                }
                            >
                                {""}
                                <RemoveIcon fontSize="small" />
                            </button>
                            <form className="quantity">
                                <input type="text" />
                            </form>
                            <button
                                className="add-btn"
                                onClick={() => setItemCount(itemCount + 1)}
                            >
                                {""}
                                <AddIcon fontSize="small" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ShopPage;
