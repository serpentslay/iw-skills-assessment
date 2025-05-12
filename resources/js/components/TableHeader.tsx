import React from "react";
import { useUserTable } from '@/contexts/UserTableContext';

const columns = ["id", "name", "email"];

const TableHeader: React.FC = () => {

    const { state, dispatch } = useUserTable();
    const { sortColumn, sortDirection} = state;

    const handleSort = (column: string) => {
        const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
        dispatch({ type: "SET_SORT", payload: { column, direction: newDirection } });
    };

    return (
        <thead>
        <tr>
            {columns.map((col) => (
                <th
                    key={col}
                    onClick={()=>handleSort(col)}
                    className={`cursor-pointer border px-4 py-2 ${sortColumn === col ? "bg-gray-200" : ""}`}
                >
                    {col.toUpperCase()} {sortColumn === col ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                </th>
            ))}
            <th className="border px-4 py-2">Verified</th>
        </tr>
        </thead>
    );
};

export default TableHeader;
