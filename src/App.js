import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';

import './App.css';

const App = () => {
  const ESCAPE_KEY = 27;
  const ENTER_KEY = 13;

  const initialTodos = [
    { id: 1, title: 'Estudar React', checked: false },
    { id: 2, title: 'Estudar Inglês', checked: true },
    { id: 3, title: 'Estudar NodeJS', checked: false },
    { id: 4, title: 'Estudar JavaScript', checked: false },
    { id: 5, title: 'Estudar PHP+Laravel', checked: false },
    { id: 6, title: 'Estudar C#', checked: false },
  ];

  const [todos, setTodos] = useState(initialTodos);
  const [value, setValue] = useState('');

  const erase = () => {
    setValue('');
  };

  const submit = () => {
    setTodos([
      ...todos,
      {
        id: new Date().getTime(),
        title: value,
        checked: false
       }
      ]);

    erase();
  };

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onKeyDown = (event) => {
    if (event.which === ENTER_KEY) {
      submit();
    } else if (event.which === ESCAPE_KEY) {
      erase();
    }
  };

  const onToggle = (todo) => {
    setTodos(
      todos.map((obj) =>
    (obj.id === todo.id ? { ...obj, checked: !todo.checked } : obj))
    );
  };

  const onRemove = (todo) => {
    setTodos(todos.filter((obj) => obj.id !== todo.id));
  };

  return (
    <section id="app" className="container">
      <header>
        <h1 className="title">ToDo</h1>
      </header>
      <section className="main">
        <input
          className="new-todo"
          placeholder="O que precisa ser feito?"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id.toString()}>
              <span
              className={['todo', todo.checked ? "checked" : ""].join(' ')}
              onClick={() => onToggle(todo)}
              onkeyPress={() => onToggle(todo)}
              role="button"
              tabIndex={0}
              >{todo.title}</span>
              <button
                className='remove'
                type="button"
                onClick={() => onRemove(todo)}
              >
                <MdDelete size={28} />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default App;
