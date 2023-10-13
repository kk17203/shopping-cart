import { Link } from "react-router-dom";
import { Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import { useState } from "react";

function NavBar() {
    const [itemCount] = useState(() => {
        const storedItemCount = localStorage.getItem("itemCount");
        return storedItemCount ? parseInt(storedItemCount) : 0;
    });
    return (
        <div>
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
        </div>
    );
}

export default NavBar;
