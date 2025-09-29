import React from 'react';
import { View, Button, Alert } from 'react-native';
import { exportBackup } from '../utils/backup';


export default function RestoreScreen() {
const onExport = async () => {
const path = await exportBackup();
Alert.alert(`Exported to ${path}`);
};


const onRestore = async () => {
Alert.alert('File picker restore not implemented — use react-native-document-picker to select backup JSON.');
};


return (
<View style={{ padding: 16 }}>
<Button title="Export backup (JSON)" onPress={onExport} />
<View style={{ height: 8 }} />
<Button title="Restore (select file)" onPress={onRestore} />
</View>
);
}