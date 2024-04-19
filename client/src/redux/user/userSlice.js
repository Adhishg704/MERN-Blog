import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    errors: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.errors = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.errors = null
        },
        signInFailure: (state, action) => {
            state.errors = action.payload
        },
        updateStart: (state) => {
            state.errors = null
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.errors = null
        },
        updateFailure: (state, action) => {
            state.errors = action.payload
        },
        deleteStart: (state) => {
            state.errors = null;
        },
        deleteSuccess: (state) => {
            state.currentUser = null,
            state.errors = null
        },
        deleteFailure: (state, action) => {
            state.errors = action.payload
        }
    }
});

export const {signInStart, signInSuccess, signInFailure, updateStart, updateSuccess, updateFailure, deleteStart, deleteSuccess, deleteFailure} = userSlice.actions;

export default userSlice.reducer;