import 'bootswatch/dist/darkly/bootstrap.min.css'
import './App.css'
import Login from './screens/login/Login'
import CreateUser from './screens/user/CreateUser';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import AppContext from './experiments/context/AppContext';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <AppRoutes/>
        </AuthProvider>
    )
}

export default App;


// function App() {
//     return (
//         <LocalStorage/>
//     )
// }

// function App() {
//     return (
//         <AppContext />
//     )
// }

// export default App;