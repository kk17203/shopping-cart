import { useEffect, useState } from "react";

function ProductData() {
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

    const updatedData = shopItems.map((item) => {
        return {
            ...item,
            quantity: 0,
        };
    });
    console.log(updatedData);
}

export default ProductData;

//trying to transfer the datat from ShopPage.jsx to ProductData.jsx. Hopeing to be able to make new array out of it but add a separate value for each item in the array in order to keep track of individual input values.
