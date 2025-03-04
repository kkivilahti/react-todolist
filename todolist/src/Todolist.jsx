import { useState } from 'react'
import TodoTable from './TodoTable';

export default function Todolist() {
    const [entry, setEntry] = useState({ description: '', date: '' });
    const [todos, setTodos] = useState([]);

    const addTodo = () => {
        if (entry.description != '' && entry.date != '') {
            setTodos([...todos, entry]);
            setEntry({ description: '', date: '' });
        }
    }

    const deleteTodo = (index) => {
        setTodos(todos.filter((todo, i) => i !== index));
    }

    return (
        <>
            <label htmlFor="description">Description:</label>
            <input name="description" value={entry.description} onChange={(e) => setEntry({ ...entry, description: e.target.value })} />
            <label htmlFor="date">Date:</label>
            <input name="date" value={entry.date} onChange={(e) => setEntry({ ...entry, date: e.target.value })} />
            <button onClick={addTodo} id="add-button">Add</button>

            <TodoTable todos={todos} deleteTodo={deleteTodo} />
        </>
    );
}