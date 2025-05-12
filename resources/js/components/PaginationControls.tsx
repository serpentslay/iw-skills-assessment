import { Button } from '@/components/ui/button';
import React from 'react';
import { useUserTable } from '@/contexts/UserTableContext';

const PaginationControls: React.FC = () => {

    const { state, dispatch } = useUserTable();
    const { currentPage, totalPages, perPage } = state;

    const setPage = (page:number) => {
        dispatch({ type: "SET_PAGE", payload: page });
    }

    const setPerPage = (perPage:number)=>{
        dispatch({ type: "SET_PER_PAGE", payload: perPage });
    }

    return (
        <div className="mt-4 flex items-center justify-between">
            <Button onClick={() => setPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
                Previous
            </Button>

            <div className="flex flex-col items-center">
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <select value={perPage} onChange={(e) => setPerPage(parseInt(e.target.value))} className="mb-4 rounded border px-4 py-2">
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>

            <Button onClick={() => setPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
                Next
            </Button>
        </div>
    );
};

export default PaginationControls;
