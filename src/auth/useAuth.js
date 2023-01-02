import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_BASE_URL } from "../configs/constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const navigate = useNavigate();

    const signin = async(email, password) => {
        try {
            const response = await fetch(`${APP_BASE_URL}/member/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3ZWJhcHAiLCJleHAiOjMxODcxODQ0MDAsImlhdCI6MTY3MjI4OTMxNn0.95VJllUOgowKUbcYTZvgQ1pGR2oA9rsoG8ecIpsRDco6BIBjae5AUu-P-O2X64qSP7077zfPJc3E0cBFeqpXDg'
                  },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
            navigate("/admin/dashboard", {
                replace: true
            });
        } catch (error) {
            console.error(error);
        }
    }

    const signout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/signin", {
            replace: true
        });
    }

    const value = useMemo(
        () => ({
            user,
            signin,
            signout
        }),

        // eslint-disable-next-line
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export const useAuth = () => {
    return useContext(AuthContext);
}