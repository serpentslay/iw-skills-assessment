import React from "react";
import { useUserTable } from '@/contexts/UserTableContext';

const SearchInput: React.FC = () => {

    const { dispatch } = useUserTable();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
    };
    return (
        <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
            className="w-full rounded border px-4 py-2"
        />
    );
};

export default SearchInput;
