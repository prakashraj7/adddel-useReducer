import * as React from 'react';
import './style.css';

export default function App() {
  const initialState = [
    {
      id: Date.now(),
      name: 'Prakash',
      email: 'prak@email.com',
    },
  ];

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [state, dispatch] = React.useReducer(reducer, initialState);
  console.log(state);

  function reducer(state, action) {
    switch (action.type) {
      case 'add':
        return [...state, action.payload];
      case 'del':
        return state.filter((contact) => {
          return contact.id !== action.payload.id;
        });
      default:
        throw new Error();
    }
  }

  const handSubmit = (e) => {
    e.preventDefault();
    const contact = {
      id: Date.now(),
      name,
      email,
    };
    setName('');
    setEmail('');
    dispatch({
      type: 'add',
      payload: contact,
    });
  };

  return (
    <div>
      <h2>UseReducer!</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handSubmit}>Add</button>
      <div>
        <ul>
          {state.map((contact) => {
            return (
              <li key={contact.id}>
                <h2>{contact.name}</h2>
                <h2>{contact.email}</h2>
                <div>
                  <button
                    onClick={() =>
                      dispatch({ type: 'del', payload: { id: contact.id } })
                    }
                  >
                    Del
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
