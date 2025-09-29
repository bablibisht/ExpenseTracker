import RNFS from 'react-native-fs';
import { fetchAllExpenses } from '../db/sqlite';


const BACKUP_DIR = RNFS.DocumentDirectoryPath + '/expense_backups';


export const exportBackup = async (filename?: string) => {
const data = await fetchAllExpenses();
await RNFS.mkdir(BACKUP_DIR);
const file = `${BACKUP_DIR}/${filename ?? `backup_${Date.now()}.json`}`;
await RNFS.writeFile(file, JSON.stringify(data), 'utf8');
return file;
};


export const readBackup = async (path: string) => {
const text = await RNFS.readFile(path, 'utf8');
return JSON.parse(text);
};


export const restoreFromObject = async (items: any[]) => {
const { deleteAllExpenses, insertExpense } = await import('../db/sqlite');
await deleteAllExpenses();
for (const it of items) {
await insertExpense({ category: it.category, amount: it.amount, note: it.note, date: it.date });
}
};