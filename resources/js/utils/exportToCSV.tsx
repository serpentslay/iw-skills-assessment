import Papa from 'papaparse';

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
}

const exportToCSV = (users: User[]) => {
    if (users.length === 0) {
        console.warn("No data to export.");
        return;
    }

    const csvData = users.map((user) => ({
        ID: user.id,
        Name: user.name,
        Email: user.email,
        Verified: user.email_verified_at ? "Yes" : "No",
    }));

    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const fileName = `users_${new Date().toISOString()}.csv`;
    link.href = url;
    link.setAttribute("download", fileName);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
};

export default exportToCSV;
