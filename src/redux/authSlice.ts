import {createSlice} from "@reduxjs/toolkit";

interface AuthState {
    isLoggedIn: boolean
}

const authState: string | null = localStorage.getItem("AUTH_STATE");

let initialState = {
    isLoggedIn: false, 
} as AuthState;

if (typeof authState === "string") {
    const parseState = JSON.parse(authState);
    initialState = parseState as AuthState;
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = true
            localStorage.setItem("AUTH_STATE", JSON.stringify({isLoggedIn: true}));
        },
        logout: (state) => {
            state.isLoggedIn = false;
            localStorage.removeItem("AUTH_STATE");
        }
    }
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;