import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [entry, setEntry] = useState({ description: '', date: '' });
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    setTodos([...todos, entry]);
  }

  return (
    <>
      <h1>To Do List</h1>
      <label for="description">Description:</label>
      <input name="description" value={entry.description} onChange={(e) => setEntry({ ...entry, description: e.target.value })} />
      <label for="date">Date:</label>
      <input name="date" value={entry.date} onChange={(e) => setEntry({ ...entry, date: e.target.value })} />
      <button onClick={addTodo} id="add-button">Add</button>

      {todos.length > 0 && <table>
        <thead>
          <td>Date</td>
          <td>Description</td>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.date}</td>
              <td>{todo.description}</td>
            </tr>
          ))}
        </tbody>
      </table>}
    </>
  )
}

export default App

