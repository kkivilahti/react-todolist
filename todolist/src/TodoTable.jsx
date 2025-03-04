export default function TodoTable(props) {

    return (
        <>
            {props.todos.length > 0 && <table>
                <thead>
                    <tr>
                        <td>Date</td>
                        <td>Description</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {props.todos.map((todo, index) => (
                        <tr key={index}>
                            <td>{todo.date}</td>
                            <td>{todo.description}</td>
                            <td><button id="del-button" onClick={() => props.deleteTodo(index)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </>
    );
}