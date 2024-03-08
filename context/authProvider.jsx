import { useState, createContext } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({children}) =>{
    const [accessToken, setAccessToken] = useState("");
    return (
        <AuthContext.Provider value={{accessToken, setAccessToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext