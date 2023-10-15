import { Link } from "react-router-dom";
import { Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import { useState } from "react";

function App() {
    // This useState uses a function to calculate its initial state, pulling itemCount from local storage or (if no itemCount stored) setting state to 0.
    const [itemCount] = useState(() => {
        const storedItemCount = localStorage.getItem("itemCount");
        return storedItemCount ? parseInt(storedItemCount) : 0;
    });

    // This line checks to see if the current page is the home page, and if so, adds a class of "highlighted" to the home link in the nav bar.
    const isOnPage = location.pathname === "/";

    return (
        <div className="container">
            <div className="nav-bar">
                <h1>Shopping Cart Project</h1>
                <ul>
                    <li className={isOnPage ? "highlighted" : ""}>
                        <Link to="/">Home Page</Link>
                    </li>
                    <li>
                        <Link to="/shoppage">Shop Page</Link>
                    </li>
                    <Link to="/cartpage">
                        <Badge badgeContent={itemCount} color="primary">
                            <ShoppingCartIcon />{" "}
                        </Badge>
                    </Link>
                </ul>
            </div>
            <div>This is home Page</div>
        </div>
    );
}

export default App;
