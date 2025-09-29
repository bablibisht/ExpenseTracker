import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { initDB, fetchAllExpenses } from '../db/sqlite';
import ExpensePie from '../components/ExpensePie';
import { Expense } from '../models/expense';


export default function HomeScreen({ navigation }: any) {
const [expenses, setExpenses] = useState<Expense[]>([]);


const load = async () => {
await initDB();
const all = await fetchAllExpenses();
setExpenses(all);
};


useEffect(() => {
const unsub = navigation.addListener('focus', load);
load();
return unsub;
}, []);


return (
<View style={{ flex: 1, padding: 16 }}>
<Button title="Add expense" onPress={() => navigation.navigate('AddExpense')} />
<Button title="Backup / Restore" onPress={() => navigation.navigate('Restore')} />


<ExpensePie expenses={expenses} />


<Text style={{ marginTop: 16, fontWeight: 'bold' }}>Recent</Text>
<FlatList
data={expenses}
keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
renderItem={({ item }) => (
<View style={{ padding: 8, borderBottomWidth: 1 }}>
<Text>{item.category} — ₹{item.amount}</Text>
<Text>{new Date(item.date).toLocaleString()}</Text>
</View>
)}
/>
</View>
);
}