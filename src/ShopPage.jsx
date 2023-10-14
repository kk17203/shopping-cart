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
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        if (shopItems) {
            const totalQuantity = shopItems.reduce(
                (total, item) => total + item.quantity,
                0
            );
            setItemCount(totalQuantity);
            localStorage.setItem("itemCount", JSON.stringify(totalQuantity));
        }
    }, [shopItems]);

    useEffect(() => {
        const storedShopItems = JSON.parse(localStorage.getItem("shopItems"));

        fetch("https://fakestoreapi.com/products", {
            mode: "cors",
        })
            .then((response) => response.json())
            .then((json) => {
                // this next few lines takes the array from the api and adds a quantity field?? might need to update this comment
                const updatedProducts = json.map((item) => ({
                    ...item,
                    quantity: 0,
                }));
                if (
                    storedShopItems &&
                    storedShopItems.length === updatedProducts.length
                ) {
                    setShopItems(storedShopItems);
                } else {
                    setShopItems(updatedProducts);
                }
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    if (error) return <p>A network error was encountered</p>;
    if (loading) return <p>Loading...</p>;

    const handleInputChange = (e, id) => {
        const updatedItems = shopItems.map((item) =>
            item.id === id
                ? {
                      ...item,
                      //   Checks if target value is NaN. If so it applies 0
                      quantity: isNaN(parseInt(e.target.value))
                          ? 0
                          : parseInt(e.target.value),
                  }
                : item
        );
        setShopItems(updatedItems);
        localStorage.setItem("shopItems", JSON.stringify(updatedItems));
        console.log(shopItems);
    };

    const handleAdd = (id) => {
        const updatedItems = shopItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setShopItems(updatedItems);
    };

    const handleRemove = (id) => {
        const updatedItems = shopItems.map((item) =>
            item.id === id
                ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
                : item
        );
        setShopItems(updatedItems);
    };

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
                        <p className="quantity">{item.quantity}</p>
                        <div className="btn-set">
                            <button
                                className="remove-btn"
                                onClick={() => handleRemove(item.id)}
                            >
                                {""}
                                <RemoveIcon fontSize="small" />
                            </button>
                            <form className="quantity" id="quantity">
                                <input
                                    type="text"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleInputChange(e, item.id)
                                    }
                                />
                            </form>
                            <button
                                className="add-btn"
                                onClick={() => handleAdd(item.id)}
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
