import { useState, useEffect } from "react";

function ShopPage() {
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
                </div>
            ))}
        </div>
    );
}

export default ShopPage;
