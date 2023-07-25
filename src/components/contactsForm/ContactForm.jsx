import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/operations';
import Notiflix from 'notiflix';
import { selectItems } from 'redux/selectors';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  const onFormSubmit = e => {
    e.preventDefault();
    const { name, number } = e.currentTarget.elements;
    // console.log(items);
    if (
      items.some(
        contact => contact.name.toLowerCase() === name.value.toLowerCase()
      )
    ) {
      Notiflix.Report.warning(
        'Warning',
        `${name.value} is already in contacts.`
      );
      return;
    } else {
      dispatch(addContacts({ name: name.value, phone: number.value }));
    }

    e.target.reset();
  };

  return (
    <form onSubmit={onFormSubmit} className={css.form}>
      <label className={css.label}>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я\s]+$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.label}>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?[0-9\s\-\(\)]+"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};
