import { Link, Outlet } from "react-router-dom";

function App() {
    return (
        <div>
            <h1>Shopping Cart Project</h1>
            <p>Here are some links</p>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home Page</Link>
                    </li>
                    <li>
                        <Link to="shoppage">Shop Page</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}

export default App;
