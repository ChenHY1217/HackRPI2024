import {createSlice, current} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    userInfo: null,
};

const loadInitialState = async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
};

loadInitialState().then(userInfo => {
    initialState.userInfo = userInfo;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            AsyncStorage.setItem('userInfo', JSON.stringify(action.payload));

            // Set expiration time for the token
            const currentTime: number = new Date().getTime();
            const expirationTime: number = currentTime + 30 * 24 * 60 * 60 * 1000; // 30 days
            AsyncStorage.setItem('expirationTime', expirationTime.toString()); // Store expiration time in AsyncStorage
        },

        logout: (state) => {
            state.userInfo = null;
            AsyncStorage.clear();
        },
    },
});

export const {setCredentials, logout} = authSlice.actions;
export default authSlice.reducer;
