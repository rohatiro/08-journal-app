import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // not-authenticated, authenticated, checking
        uid: null,
        email: null,
        displayName: null,
        pthotoUrl: null,
        errorMessage: null
    },
    reducers: {
        login: (state, action) => {

        },
        logout: (state, action) => {

        },
        checkingCredentials: (state) => {
            state.status = "checking";
        }
    }
});

export const { login, logout, checkingCredentials } = authSlice.actions;