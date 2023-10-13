import { useState, useEffect } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

function ShopPage({ setItemCount, itemCount }) {
    const [shopItems, setShopItems] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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
                    <ButtonGroup color="primary">
                        <Button
                            className="remove-btn"
                            onClick={() =>
                                setItemCount(Math.max(itemCount - 1, 0))
                            }
                        >
                            {""}
                            <RemoveIcon fontSize="small" />
                        </Button>
                        <Button
                            className="add-btn"
                            onClick={() => setItemCount(itemCount + 1)}
                        >
                            {""}
                            <AddIcon fontSize="small" />
                        </Button>
                    </ButtonGroup>
                </div>
            ))}
        </div>
    );
}

export default ShopPage;
