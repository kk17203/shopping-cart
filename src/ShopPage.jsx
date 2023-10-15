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

    // This useEffect ensures that whenever there's a change in the shopItems array, it calculates the total amount of items across all quantity properties and updates the itemCount state with this total. It also stores this total quantity in the local storage for persistence.
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

    // This useEffect gets the shopItems array stored on localStorage and assigns it as storedShopItems. It then fetches an array of items from the fakestoreapi, adds a quantity property to each object, and assigns it as updatedProducts. It checks to see if storedShopItems is truthy and compares storedShopItems and updatedProducts lengths. If they match (nothing new added to fetched array), we setShopItems as storedShopItems (keeping our stored quantity properties), if they don't match (something new was added from out shop), we setShopItems as updatedProducts (resetting our quantity properties to 0). Finally we have lines to catch errors or display loading screen.
    useEffect(() => {
        const storedShopItems = JSON.parse(localStorage.getItem("shopItems"));

        fetch("https://fakestoreapi.com/products", {
            mode: "cors",
        })
            .then((response) => response.json())
            .then((json) => {
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

    // handleInputChange maps through all shopItems, checks to see if each matches the item.id from the event, and changes the quantity of the matching item to the event target value (As long as the value is a number. If NaN, it sets value to 0). It then updates setShopItems and pushes to localStorage.
    const handleInputChange = (e, id) => {
        const updatedItems = shopItems.map((item) =>
            item.id === id
                ? {
                      ...item,
                      quantity: isNaN(parseInt(e.target.value))
                          ? 0
                          : parseInt(e.target.value),
                  }
                : item
        );
        setShopItems(updatedItems);
        localStorage.setItem("shopItems", JSON.stringify(updatedItems));
    };

    // handleAdd maps through shopItems to find the matching item.id, changes the quantity of this item to current value + 1, then updates setShopItems
    const handleAdd = (id) => {
        const updatedItems = shopItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setShopItems(updatedItems);
    };

    // handleRemove maps through shopItems to find the matching item.id, changes the quantity of this item to current value - 1 (while using Math.max to make sure we don't go below 0), then updates setShopItems
    const handleRemove = (id) => {
        const updatedItems = shopItems.map((item) =>
            item.id === id
                ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
                : item
        );
        setShopItems(updatedItems);
    };

    // This line checks to see if the current page is the shop page, and if so, adds a class of "highlighted" to the shop link in the nav bar.
    const isOnPage = location.pathname === "/shoppage";

    return (
        <div className="container">
            <nav className="nav-bar">
                <h1>Shopping Cart Project</h1>
                <ul>
                    <li>
                        <Link to="/">Home Page</Link>
                    </li>
                    <li className={isOnPage ? "highlighted" : ""}>
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
        </div>
    );
}

export default ShopPage;
