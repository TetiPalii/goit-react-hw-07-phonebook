import { createSelector } from '@reduxjs/toolkit';

export const selectItems = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const selectFilter = state => state.filter.filter;

export const selectVisibleContacts = createSelector(
  [selectFilter, selectItems],
  (filter, items) => {
    // console.log(items);
    const normalizedFilter = filter.toLowerCase().trim();
    const visibleContacts = items.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return visibleContacts;
  }
);
