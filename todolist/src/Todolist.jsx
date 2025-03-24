import { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TodoTable from './TodoTable';

export default function Todolist() {
    const [entry, setEntry] = useState({ description: '', date: '', priority: 'low' });
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();

    const addTodo = () => {
        if (entry.description !== '' && entry.date !== '') {
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
        <div style={{ minWidth: 1000 }}>
            <h1>To Do List</h1>
            <Stack direction="row" spacing={2} m={8} justifyContent="center" alignItems="center">
                <TextField
                    label="Description"
                    id="description"
                    size="small"
                    sx={{ width: 200 }}
                    value={entry.description}
                    onChange={(e) => setEntry({ ...entry, description: e.target.value })}
                />
                <TextField
                    label="Date"
                    id="date"
                    size="small"
                    type="date"
                    slotProps={{ inputLabel: { shrink: true }}}
                    sx={{ width: 150 }}
                    value={entry.date}
                    onChange={(e) => setEntry({ ...entry, date: e.target.value })}
                />
                <TextField
                    label="Priority"
                    id="priority"
                    size="small"
                    sx={{ width: 150 }}
                    value={entry.priority}
                    onChange={(e) => setEntry({ ...entry, priority: e.target.value })}
                    select
                >
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <Button variant="contained" onClick={addTodo}>Add</Button>
                <Button variant="contained" onClick={deleteTodo} color="error">Delete</Button>
            </Stack>

            <TodoTable todos={todos} setTodos={setTodos} gridRef={gridRef} />
        </div>
    );
}