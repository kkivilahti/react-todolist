import { useState, useRef } from 'react';
import TodoTable from './TodoTable';

export default function Todolist() {
    const [entry, setEntry] = useState({ description: '', date: '', priority: 'low' });
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();

    const addTodo = () => {
        if (entry.description != '' && entry.date != '') {
            setTodos([...todos, entry]);
            setEntry({ description: '', date: '', priority: 'low' });
        } else {
            alert("Please fill all fields");
        }
    };

    const deleteTodo = () => {
        const selectedNode = gridRef.current.getSelectedNodes()[0];
        if (selectedNode) {
            const selectedRow = selectedNode.data;
            setTodos(todos.filter((todo) => todo !== selectedRow))
        }
        else {
            alert('Please select a row first');
        }
    };

    const options = ['low', 'medium', 'high'];

    return (
        <>
            <div id="input-div">
                <label>Description:</label>
                <input type="text" value={entry.description} onChange={(e) => setEntry({ ...entry, description: e.target.value })} />
            </div>
            <div id="input-div">
                <label>Date:</label>
                <input type="date" value={entry.date} onChange={(e) => setEntry({ ...entry, date: e.target.value })} />
            </div>
            <div id="input-div">
                <label>Priority:</label>
                <select value={entry.priority} onChange={(e) => setEntry({ ...entry, priority: e.target.value })}>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <div id="button-row">
                <button onClick={addTodo} style={{margin: 10}}>Add</button>
                <button onClick={deleteTodo} style={{margin: 10}}>Delete</button>
            </div>

            <TodoTable todos={todos} setTodos={setTodos} gridRef={gridRef} />
        </>
    );
}