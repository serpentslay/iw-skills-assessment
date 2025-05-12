import exportToCSV from "@/utils/exportToCSV";
import { ClipLoader } from "react-spinners";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

import UserRow from "@/components/UserRow";
import SearchInput from "@/components/SearchInput";
import PaginationControls from "@/components/PaginationControls";
import TableHeader from "@/components/TableHeader";

import { useUserTable } from "@/contexts/UserTableContext";


const PaginatedUserTable: React.FC = () => {
    const { state } = useUserTable();
    const { users, loading } = state;

    return (
        <div className="p-4 w-full">
            <Card>
                <CardContent>
                    <h2 className="mb-4 text-xl font-bold">Users</h2>

                    <div className="mb-4 flex justify-between items-center">
                        <SearchInput />
                        <Button onClick={() => exportToCSV(users)} className="ml-4">
                            Export to CSV
                        </Button>
                    </div>

                    <div className="min-h-[500px]">
                        {loading ? (
                            <div className="flex justify-center items-center py-10">
                                <ClipLoader />
                            </div>
                        ) : (
                            <table className="w-full table-fixed border">
                                <TableHeader />
                                <tbody>
                                {users.length > 0 ? (
                                    users.map((user) => <UserRow key={user.id} user={user} />)
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center py-4">
                                            No data found
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <PaginationControls />
                </CardContent>
            </Card>
        </div>
    );
};

export default PaginatedUserTable;
