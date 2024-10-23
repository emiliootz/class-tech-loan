# Class Tech Loan System
React and MySQL-based rental system for UMass Boston

## Overview
This project is a web-based system for managing equipment loans at UMass Boston. It allows users to reserve, borrow, and return equipment, and tracks all transactions.

## Getting Started

### Prerequisites
- Node.js v14.x or v16.x
- MySQL database

### Cloning the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/emiliootz/class-tech-loan.git
cd class-tech-loan
```

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the `backend/` folder based on the example provided. Add the following variables:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=equipment_db
```

4. Set up the MySQL database:

```bash
mysql -u root -p equipment_db < schema.sql
mysql -u root -p equipment_db < seed.sql
```

5. Start the backend server:

```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm start
```

### Contributing

- Branch naming convention:
  - Backend: `backend-feature-name`
  - Frontend: `frontend-feature-name`
- Submit a pull request and assign at least one reviewer.


