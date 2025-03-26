import { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import TodoTable from './TodoTable';

export default function Todolist() {
    const [entry, setEntry] = useState({ description: '', date: dayjs(), priority: 'low' });
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();

    const handleDateChange = (newDate) => {
        setEntry({ ... entry, date: newDate });
    }

    const addTodo = () => {
        if (!entry.description || !entry.date || !entry.priority) {
            alert("Please fill all fields");
        } else {
            setTodos([...todos, entry]);
            setEntry({ description: '', date: dayjs(), priority: 'low' });
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date"
                        format="DD/MM/YYYY"
                        slotProps={{ textField: { size: "small"} }}
                        sx={{ width: 200 }}
                        value={entry.date}
                        onChange={handleDateChange}
                    />
                </LocalizationProvider>
                <TextField
                    label="Priority"
                    id="priority"
                    size="small"
                    sx={{ width: 200 }}
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