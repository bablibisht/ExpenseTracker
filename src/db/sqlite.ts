import SQLite from 'react-native-sqlite-storage';
import { Expense } from '../models/expense';


SQLite.DEBUG(false);
SQLite.enablePromise(true);


const DB_NAME = 'expenses.db';


export const getDB = async () => {
return SQLite.openDatabase({ name: DB_NAME, location: 'default' });
};


export const initDB = async () => {
const db = await getDB();
await db.executeSql(`CREATE TABLE IF NOT EXISTS expenses (
id INTEGER PRIMARY KEY AUTOINCREMENT,
category TEXT NOT NULL,
amount REAL NOT NULL,
note TEXT,
date TEXT NOT NULL
);`);
return db;
};


export const insertExpense = async (e: Expense) => {
const db = await getDB();
const res = await db.executeSql(
`INSERT INTO expenses (category, amount, note, date) VALUES (?, ?, ?, ?);`,
[e.category, e.amount, e.note ?? null, e.date]
);
const insertId = res[0].insertId as number;
return insertId;
};


export const fetchAllExpenses = async (): Promise<Expense[]> => {
const db = await getDB();
const [results] = await db.executeSql(`SELECT * FROM expenses ORDER BY date DESC;`);
const rows = results.rows;
const out: Expense[] = [];
for (let i = 0; i < rows.length; i++) {
out.push(rows.item(i));
}
return out;
};


export const deleteAllExpenses = async () => {
const db = await getDB();
await db.executeSql(`DELETE FROM expenses;`);
};