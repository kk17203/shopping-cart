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
        <div className="app-container">
            <div className="nav-bar">
                <h1>Shopping Cart Project</h1>
                <ul>
                    <li className={isOnPage ? "highlighted" : ""}>
                        <Link to="/">Home Page</Link>
                    </li>
                    <li>
                        <Link to="/shoppage">Shop Page</Link>
                    </li>
                    <li>
                        <Link to="/cartpage">
                            <Badge badgeContent={itemCount} color="primary">
                                <ShoppingCartIcon />{" "}
                            </Badge>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="app-main">
                <div className="welcome-card">
                    <h1>Welcome</h1>
                    <p>
                        This site is a project for the{" "}
                        <a
                            href="https://www.theodinproject.com/lessons/node-path-react-new-shopping-cart"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Shopping Cart
                        </a>{" "}
                        lesson in The Odin Project&apos;s Full Stack JavaScript
                        path. To see the code for this project, please visit my{" "}
                        <a
                            href="https://github.com/kk17203/shopping-cart"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub Repository.
                        </a>
                    </p>
                    <button className="shop-btn">
                        <Link to="/shoppage">Shop All Products</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
