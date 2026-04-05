import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';

import { MainTabs } from './src/navigation';
import { store } from './src/store';
import migrations from './drizzle/migrations';
import { ShipmentsRepo } from './data/dbOrm/repositories/shipmentsRepo';
import { db } from './data/dbOrm/client';
import { ThemeProvider } from './src/theme/themeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
  const { success: migrationsFinished, error: migrationError } = useMigrations(db, migrations);

  const [syncing, setSyncing] = useState(true);
  const [message, setMessage] = useState('');

useEffect(() => {
  let isMounted = true;

  if (migrationsFinished) {
    const syncData = async () => {
      try {
await new Promise(resolve => setTimeout(() => resolve(null), 500));
        
        const result = await ShipmentsRepo.syncFromRemote();
        
        if (isMounted) {
          if (result.success) {
            setMessage('Sync completed successfully!');
          } else {
            setMessage('Sync failed: ' + result.error);
          }
        }
      } catch (err) {
        console.error("Sync Error:", err);
      } finally {
        if (isMounted) setSyncing(false);
      }
    };

    syncData();
  }

  return () => { isMounted = false; };
}, [migrationsFinished]);

  if (migrationError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', }}>
        <Text style={{ color: 'red' }}>Migration Error: {migrationError.message}</Text>
      </View>
    );
  }

  if (!migrationsFinished || syncing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>
          {!migrationsFinished ? "Setting up database..." : "Syncing data..."}
        </Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <NavigationContainer>
            <MainTabs />
            {message.length > 0 && (
              <View style={{ position: 'absolute', bottom: 100, left: 20, right: 20, padding: 15, backgroundColor: '#333', borderRadius: 8 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>{message}</Text>
              </View>
            )}
          </NavigationContainer>
      </ThemeProvider> 
      </SafeAreaProvider>
    </Provider>
  );
}
