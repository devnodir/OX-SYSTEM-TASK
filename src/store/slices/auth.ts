import { getLocalStorage } from "@/utils/localStorage";
import { USER_TOKEN } from "@/utils/variables";
import { createSlice } from "@reduxjs/toolkit";

// interface of reducer
type State = {
    isAuth: boolean;
};

// initial values of reducer
const initialState: State = {
    isAuth: Boolean(getLocalStorage(USER_TOKEN)),
};

const AuthSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsAuth: (state: State, { payload }) => {
            state.isAuth = payload;
        },
    },
});

export default AuthSlice;
