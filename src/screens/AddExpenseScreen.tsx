import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { insertExpense } from '../db/sqlite';


export default function AddExpenseScreen({ navigation }: any) {
const [category, setCategory] = useState('Food');
const [amount, setAmount] = useState('');
const [note, setNote] = useState('');


const save = async () => {
if (!amount) return;
await insertExpense({ category, amount: parseFloat(amount), note, date: new Date().toISOString() });
navigation.goBack();
};


return (
<View style={{ padding: 16 }}>
<TextInput value={category} onChangeText={setCategory} placeholder="Category" />
<TextInput value={amount} onChangeText={setAmount} placeholder="Amount" keyboardType="numeric" />
<TextInput value={note} onChangeText={setNote} placeholder="Note (optional)" />
<Button title="Save" onPress={save} />
</View>
);
}