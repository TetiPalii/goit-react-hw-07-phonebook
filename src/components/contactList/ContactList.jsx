import { useSelector, useDispatch } from 'react-redux';
import css from './ContactList.module.css';

import {
  selectError,
  selectIsLoading,
  selectItems,
  selectVisibleContacts,
} from 'redux/selectors';
import { deleteContacts, fetchContacts } from 'redux/operations';
import { useEffect } from 'react';

export function ContactList() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const items = useSelector(selectItems);
  const visibleContacts = useSelector(selectVisibleContacts);
  // console.log(visibleContacts);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ul>
      {isLoading && <p>Loading contacts...</p>}
      {error && <p>{error.message}</p>}
      {items.length > 0 &&
        visibleContacts.map(({ id, name, phone }) => {
          // console.log(id);
          return (
            <li key={id} className={css.item__contact}>
              <p>
                {name}: <span>{phone}</span>
              </p>
              <button
                className={css.contact__btn}
                type="button"
                onClick={() => {
                  dispatch(deleteContacts(id));
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
    </ul>
  );
}
