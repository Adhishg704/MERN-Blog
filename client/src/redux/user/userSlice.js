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
        }
    }
});

export const {signInStart, signInSuccess, signInFailure, updateStart, updateSuccess, updateFailure} = userSlice.actions;

export default userSlice.reducer;