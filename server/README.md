## Server setup

### 1. Install dependencies
```bash
npm install
```

### 2. Initialize the database
Run the SQL migration script to create tables:
```bash
npx tsx scripts/migrate.ts
```
Make sure PostgreSQL is running and the database exists before running the migration.

### 3. Run the development server
```bash
npm run dev
```
The server will start on:
http://localhost:3000