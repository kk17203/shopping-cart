import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import ShopPage from "./ShopPage.jsx";
import CartPage from "./CartPage.jsx";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
        },
        {
            path: "/shoppage",
            element: <ShopPage />,
        },
        {
            path: "/cartpage",
            element: <CartPage />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
