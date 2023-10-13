import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import ShopPage from "./ShopPage";

function App() {
    let [itemCount, setItemCount] = useState(1);

    return (
        <div>
            <nav className="nav-bar">
                <h1>Shopping Cart Project</h1>
                <ul>
                    <li>
                        <Link to="/">Home Page</Link>
                    </li>
                    <li>
                        <Link to="shoppage">Shop Page</Link>
                    </li>
                    <Link to="cartpage">
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCartIcon />{" "}
                        </Badge>
                    </Link>
                </ul>
            </nav>
            <ShopPage itemCount={itemCount} setItemCount={setItemCount} />
            <Outlet />
        </div>
    );
}

export default App;
