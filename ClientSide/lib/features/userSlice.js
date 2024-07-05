import { createSlice } from "@reduxjs/toolkit";
import { current } from 'immer';

const initialState = {
  user: [
    { isAuth: false, email: '', password: '', name: '' },
    { email: 'v@gmail.com', password: 'v123', isAuth: false, name: 'vvvv' },
    { email: 'z@gmail.com', password: 'v123', isAuth: false, name: 'vvvv' },
    { email: 'y@gmail.com', password: 'v123', isAuth: false, name: 'vvvv' },
    { email: 'a@gmail.com', password: 'a123', isAuth: false, name: 'aaaa' }
  ],
  loggedUser: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUp: (state, action) => {
      state.user.push({
        email: action.payload.email,
        password: action.payload.password,
        isAuth: false,
        name: action.payload.name,
      });
    },
    logIn: (state, action) => {
      const rawState = current(state);
      const logUser = rawState.user.find(us => us.email === action.payload.email);
      
      if (!logUser) {
        alert('User not found');
        return state; 
      } 
      
      if (logUser.password === action.payload.password) {
        const updatedUser = {
          ...logUser,
          isAuth: true
        };
        document.cookie = `user=${JSON.stringify({ isAuth: true, email: logUser.email })};`;

        const updatedUsers = state.user.map(user =>
          user.email === action.payload.email ? updatedUser : user
        );
        localStorage.setItem(`${action.payload.email}`,JSON.stringify(updatedUser))
        return {
          ...state,
          user: updatedUsers,
          loggedUser: updatedUser  
        };
      } else {
        alert('Incorrect password');
        return state; 
      }
    },
    logOut:(state,action)=>{
      const rawState = current(state);
      const logUser = rawState.user.find(us => us.email === action.payload.email);
      
        const updatedUser = {
          ...logUser,
          isAuth: false
        };
        document.cookie = `user=${JSON.stringify({ isAuth: false, email: action.payload.email })};`;
        localStorage.setItem(`${action.payload.email}`,"")
        const updatedUsers = state.user.map(user =>
          user.email === action.payload.email ? updatedUser : user
        );
        return {
          ...state,
          user: updatedUsers,
          loggedUser: ''
        };
      
    },
    getUserData: (state, action) => {
      const rawState = current(state);
      const logUser = rawState.user.find(us => us.email === action.payload);
      return {
        ...state,
        loggedUser: logUser
      };
    }
  }
});

export const { logIn, signUp, getUserData ,logOut} = userSlice.actions;
export default userSlice.reducer;
