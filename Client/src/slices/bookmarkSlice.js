import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookmarks : [],
    quantity: 0
};

const bookmarkSlice = createSlice({
    name: "bookmark",
    initialState,
    reducers: {
        addBookmark: (state, action)=>{
            const existingItem = state.bookmarks.find((item) => item._id === action.payload._id
        );
        
        if (!existingItem){
            state.bookmarks.push({...action.payload});
            state.quantity++;
        }
    },
        removeBookmark: (state, action)=> {
            const remainingItems = state.bookmarks.filter(
                (item) => item._id !== action.payload
            );
            state.bookmarks= remainingItems;
            state.quantity=remainingItems.length;
        },

        removeAll: (state) => {
            state.bookmarks = [];
            state.quantity = 0;

        },

    },
});


export const {addBookmark, removeBookmark, removeAll} = bookmarkSlice.actions;

export const bookmarkReducer = bookmarkSlice.reducer;