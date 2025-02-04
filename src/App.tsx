import { useState, FC } from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import routes from "./routes/router";

const App: FC = () => {
    const [count, setCount] = useState<number>(0);

    return (
        <div className="app-container">
            <nav className="sidebar">
                <Link to="/">Home</Link>
                <br />
                <Link to="/movies">Movies</Link>
                <br />
                <Link to="/user">UserList</Link>
                <br />
                <Link to="/typing">Typing</Link>
                <br />
                <Link to="/chatApp">ChatApp</Link>
            </nav>
            <div className="content">
                <Routes>
                    {
                        routes.map((route, index) => (
                            <Route key={index} path={route.path} element={route.element} />
                        ))
                    }
                </Routes>
            </div>
        </div>
    );
}

export default App;
