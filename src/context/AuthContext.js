import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login as loginApi, signup as signupApi } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser) setUser(JSON.parse(storedUser));
        };
        loadUser();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await loginApi(email, password);
            await AsyncStorage.setItem("token", res.data.token);
            await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
            setUser(res.data.user);
            return true;
        } catch (error) {
            console.log("something went wrong", error);
        }

    };

    const logout = async () => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
