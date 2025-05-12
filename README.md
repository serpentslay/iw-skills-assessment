# Paginated User Table with Search, Sort, and Export to CSV

This project is a React and Laravel application that displays a paginated table of users with search, sort, and export-to-CSV functionality. It leverages a Laravel backend for data management and a React frontend for the user interface.

##  Features

* **Pagination:** Navigate through users with customizable items per page.
* **Search:** Filter users by name or email.
* **Sorting:** Sort data by columns (ID, Name, Email, Verified).
* **Export to CSV:** Download the displayed user data as a CSV file.

##  File Structure

```
├── app
│   └── Http
│       └── Controllers
│           └── UserController.php
├── resources
│   └── js
│       └── components
│           ├── PaginatedUserTable.tsx
│           ├── UserRow.tsx
│           ├── SearchInput.tsx
│           ├── TableHeader.tsx
│           └── PaginationControls.tsx
│       └── utils
│               └── exportToCSV.ts
└── routes
    ├── api.php
    └── web.php
```

---

## Usage

1. **Navigate to the Home Page:**

    * Visit `http://127.0.0.1/` to view the paginated user table.

2. **Search for Users:**

    * Enter a search term to filter users by name or email.

3. **Sort Columns:**

    * Click on any column header (ID, Name, Email, Verified) to sort data.

4. **Export to CSV:**

    * Click the **Export to CSV** button to download the visible data as a `.csv` file.

---

## API Endpoints

* `GET /api/users`

    * Parameters:

        * `page`: Current page number
        * `perPage`: Items per page
        * `search`: Search term
        * `sort`: Sort column
        * `direction`: Sort direction (`asc` or `desc`)

---

## Technologies Used

* **Laravel:** Backend framework
* **React & TypeScript:** Frontend framework and type management
* **Tailwind CSS:** Styling
* **Papaparse:** CSV export

---

## Future Enhancements

* Column reordering
* Advanced filtering
* Dynamic column visibility
* Enhanced CSV export with all pages
