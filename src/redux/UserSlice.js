import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../setup/axios'
import { getAccountToke } from '../services/userService'

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    accout: {}
}

const fechUserToken = createAsyncThunk(
    'user/get-user-token', async () => {
        try {
            let res = await getAccountToke();
            if (res && res.ec === 0) {
                return res.dt;
            } else {
                throw new Error(res.em);
            }
        } catch (error) {
            throw error;
        }
    }
)

export const UserSlice = createSlice({
    name: 'userisaccess',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fechUserToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.accout = action.payload;
            })
            .addCase(fechUserToken.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.accout = {}
            })

    }
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export { fechUserToken }

export default UserSlice.reducer