import PaginatedUserTable from "@/components/PaginatedUserTable"
import { UserTableProvider } from '@/contexts/UserTableContext';

export default function Index() {

    return (
        <UserTableProvider>
            <div className={`flex justify-center items-center py-36`}>
                <PaginatedUserTable />
            </div>
        </UserTableProvider>
    );
}
