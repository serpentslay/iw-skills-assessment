import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
}

interface State {
    users: User[];
    currentPage: number;
    totalPages: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: "asc" | "desc";
    perPage: number;
    loading: boolean;
}

const initialState: State = {
    users: [],
    currentPage: 1,
    totalPages: 1,
    searchTerm: "",
    sortColumn: "id",
    sortDirection: "asc",
    perPage: 10,
    loading: false,
};

type Action =
    | { type: "SET_USERS"; payload: User[] }
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "SET_SEARCH_TERM"; payload: string }
    | { type: "SET_PAGE"; payload: number }
    | { type: "SET_TOTAL_PAGES"; payload: number }
    | { type: "SET_SORT"; payload: { column: string; direction: "asc" | "desc" } }
    | { type: "SET_PER_PAGE"; payload: number };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_USERS":
            return { ...state, users: action.payload };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "SET_SEARCH_TERM":
            return { ...state, searchTerm: action.payload, currentPage: 1 };
        case "SET_PAGE":
            return { ...state, currentPage: action.payload };
        case "SET_TOTAL_PAGES":
            return { ...state, totalPages: action.payload };
        case "SET_SORT":
            return {
                ...state,
                sortColumn: action.payload.column,
                sortDirection: action.payload.direction,
            };
        case "SET_PER_PAGE":
            return { ...state, perPage: action.payload, currentPage: 1 };
        default:
            return state;
    }
};

const UserTableContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export const UserTableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetchUsers();
    }, [state.currentPage, state.perPage, state.searchTerm, state.sortColumn, state.sortDirection]);

    const fetchUsers = async () => {
        dispatch({ type: "SET_LOADING", payload: true });

        try {
            const { currentPage, perPage, searchTerm, sortColumn, sortDirection } = state;

            const response = await axios.get("/api/users", {
                params: {
                    page: currentPage,
                    perPage,
                    search: searchTerm,
                    sort: sortColumn,
                    direction: sortDirection,
                },
            });

            dispatch({ type: "SET_USERS", payload: response.data.data });
            dispatch({ type: "SET_TOTAL_PAGES", payload: response.data.last_page });
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };

    return (
        <UserTableContext.Provider value={{ state, dispatch }}>
            {children}
        </UserTableContext.Provider>
    );
};

export const useUserTable = () => useContext(UserTableContext);
