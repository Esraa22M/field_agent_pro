import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MainTabs } from './src/navigation';
import { store } from './src/store';
import migrations from './drizzle/migrations';
import { ShipmentsRepo } from './data/dbOrm/repositories/shipmentsRepo';
import { db } from './data/dbOrm/client';
import { ThemeProvider } from './src/theme/themeContext';
import i18n from './i18n';

export default function App() {
  const { success: migrationsFinished, error: migrationError } = useMigrations(db, migrations);

  const [syncing, setSyncing] = useState(true);
  const [ready, setReady] = useState(false); 
  const [message, setMessage] = useState('');

  useEffect(() => {
    const initLang = async () => {
      const lang = await AsyncStorage.getItem('appLang');

      const isArabic = lang === 'ar';

      I18nManager.allowRTL(isArabic);
      I18nManager.forceRTL(isArabic);

      if (lang) {
        await i18n.changeLanguage(lang);
      }

      setReady(true); 
    };

    initLang();
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (migrationsFinished) {
      const syncData = async () => {
        try {
          await new Promise((resolve:any) => setTimeout(resolve, 800));

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
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>
          Migration Error: {migrationError.message}
        </Text>
      </View>
    );
  }

  if (!ready || !migrationsFinished || syncing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>
          {!ready
            ? "Preparing app..."
            : !migrationsFinished
            ? "Setting up database..."
            : "Syncing data, please wait..."}
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
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
  },
});