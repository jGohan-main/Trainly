import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FrontPage from "./pages/Front";
import AppBackground from "./layouts/AppBackground";
import { applyTheme, getInitialTheme } from "./layouts/theme";

const App = () => {

    // 🔥 ensures theme is applied when app loads
    useEffect(() => {
        const initialTheme = getInitialTheme();
        applyTheme(initialTheme);
    }, []);

    return (
        <BrowserRouter>
            <AppBackground>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/main" element={<FrontPage />} />
                </Routes>
            </AppBackground>
        </BrowserRouter>
    );
};

export default App;