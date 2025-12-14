import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../screens/login/Login";
import CreateUser from "../screens/user/CreateUser";
import Home from "../main/Home";
import MainLayout from "./MainLayout";
import UserList from "../screens/user/UserList";
import EditUser from "../screens/user/EditUser";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";
import { ThemeContext } from "../experiments/context/ThemeContext";
import ExLocalStorage from "../experiments/ExLocalStorage";
import AppContext from "../experiments/context/AppContext";
import {useNavigate} from "react-router-dom";

function AppRoutes() {
    // const navigate = useNavigate();

    return (
        // <Router basename='/dac-react-frontend/'>
        <Router>
            <Routes>
                {/* Tela de login (sem Navbar) */}
                <Route path="/" element={<Login />} />
                <Route path="/createUser" element={<CreateUser returnPath={"/"}/>} />
                {/* <Route path="/appContext" element={<AppContext />} /> */}
                {/* <Route path="/lst" element={<ExLocalStorage/>} /> */}

                {/* Rotas da aplicação (com Navbar) */}
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<MainLayout />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/createUserMain" element={<CreateUser returnPath={"/home"}/>} />
                        <Route path="/userlist" element={<ProtectedRoute roles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
                            <UserList />
                        </ProtectedRoute>} />
                        <Route path="/edituser/:id" element={<EditUser />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;