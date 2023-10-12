import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import HomePage from "./HomePage.jsx";
import ShopPage from "./ShopPage.jsx";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [
                { index: true, element: <HomePage /> },
                { path: "shoppage", element: <ShopPage /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
