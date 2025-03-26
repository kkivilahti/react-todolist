import { useState } from "react";
import dayjs from "dayjs";

import { AllCommunityModule, ModuleRegistry, themeMaterial } from 'ag-grid-community';
import { AgGridReact } from "ag-grid-react";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

export default function TodoTable(props) {

    const dateStr = (date) => {
        return dayjs(date).format("D.M.YYYY");
    };

    const [columnDefs] = useState([
        { field: 'date', valueFormatter: (params) => dateStr(params.value), minWidth: 100 },
        { field: 'description', flex: 2 },
        {
            field: 'priority',
            minWidth: 100,
            cellStyle: (params) => ({
                color: params.value === "high" ? 'red' : params.value === "low" ? 'forestGreen' : 'black',
            })
        }
    ]);

    const defaultColDef = {
        filter: true,
        animateRows: true,
        flex: 1
    };

    return (
        <div id="ag-grid-table">
            {props.todos.length > 0 &&
                <AgGridReact
                    theme={themeMaterial}
                    headerHeight={40}
                    ref={props.gridRef}
                    onGridReady={params => props.gridRef.current = params.api}
                    rowData={props.todos}
                    columnDefs={columnDefs}
                    rowSelection={{ mode: "singleRow" }}
                    defaultColDef={defaultColDef}
                />
            }
        </div>
    );
}