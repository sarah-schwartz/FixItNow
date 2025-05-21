import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    name: "אורח",
    role: "development"
};

const UserSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers: {
        updateUser:(state,action)=>{
            state.name=action.payload.name;
            state.role=action.payload.role;
        },
        updateName: (state, action) => {
            state.name = action.payload; // קבלת שם מהפעולה
        },
        updateRole: (state, action) => {
            state.role = action.payload; // קבלת אימייל מהפעולה
        },
        createUser: (state) => {
            state.name = ""; // איפוס השם
            state.role = ""; // איפוס האימייל
        },
        getRole:(state) => {
            return state.role.toString()
        },
        resetUser: () => initialValue, // איפוס המשתמש לערכי ברירת המחדל
    }
});

export const { updateName, updateEmail, createUser, resetUser,updateRole ,getRole} = UserSlice.actions;
export default UserSlice.reducer;
