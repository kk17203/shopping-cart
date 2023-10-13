import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function App() {
    const [itemCount, setItemCount] = useState(1);

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
                    <Badge badgeContent={itemCount} color="primary">
                        <ShoppingCartIcon />{" "}
                    </Badge>
                </ul>
            </nav>

            <Outlet />
        </div>
    );
}

export default App;
