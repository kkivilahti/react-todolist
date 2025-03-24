import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Todolist from './Todolist';
import HomePage from './Home';

export default function NavTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Home" />
                    <Tab label="Todos" />
                </Tabs>
            </Box>

            {value === 0 && <HomePage />}
            {value === 1 && <Todolist />}
        </>
    );
}