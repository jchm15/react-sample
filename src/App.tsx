import { useState, FC } from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import routes from "./routes/router";

import {MenuList, menuData} from "./contsants/MenuConstant"

const App: FC = () => {
    const [count, setCount] = useState<number>(0);
    const [menu, setMenu] = useState<MenuList[]>(menuData);

    return (
        <div className="app-container">
            <nav className="sidebar">
                {
                    menu.map((item) => (
                        <Link key={item.path} to={item.path}>{item.title}</Link>
                    ))
                }
                {/*<Link to="/">Home</Link>*/}
                {/*<Link to="/movies">Movies</Link>*/}
                {/*<Link to="/user">UserList</Link>*/}
                {/*<Link to="/typing">Typing</Link>*/}
                {/*<Link to="/chatApp">ChatApp</Link>*/}
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
