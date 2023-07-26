import { createSlice } from '@reduxjs/toolkit';
import { addContacts, deleteContacts, fetchContacts } from './operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContacts.pending, handlePending)
      .addCase(addContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = [...state.items, action.payload];
      })
      .addCase(addContacts.rejected, handleRejected)
      .addCase(deleteContacts.pending, handlePending)
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(contact => {
          return contact.id === action.payload.id;
        });
        state.items.splice(index, 1);
      })
      .addCase(deleteContacts.rejected, handleRejected),
});

export const contactsReducer = contactsSlice.reducer;

// export const { deleteContacts } = contactsSlice.actions;
//   extraReducers: {
//     [fetchContacts.pending]() {
//       haldlePending();
//     },
//     [fetchContacts.fulfilled](state, action) {
//       state.isLoading = false;
//       state.error = null;
//       state.items = [...state.items, ...action.payload];
//     },
//     [fetchContacts.rejected](state, action) {
//       state.isLoading = false;
//       state.error = action.payload;
//       // console.log(action.payload);
//     },
//     [addContacts.pending](state) {
//       state.isLoading = true;
//     },
//     [addContacts.fulfilled](state, action) {
//       state.isLoading = false;
//       state.items = action.payload;
//     },
//     [addContacts.rejected](state, action) {
//       state.isLoading = false;
//       state.error = action.payload;
//     },
//     [deleteContacts.pending](state) {
//       state.isLoading = true;
//     },
//     [deleteContacts.fulfilled](state, action) {
//       const index = state.contacts.findIndex(contact => {
//         return contact.id === action.payload;
//       });
//       state.contacts.splice(index, 1);
//     },
//   },
