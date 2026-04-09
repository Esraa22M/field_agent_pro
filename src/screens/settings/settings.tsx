import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  I18nManager,
  NativeModules,
  Alert,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import RNRestart from 'react-native-restart';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n'; 
import CustomText from '../../components/customText';
import { useTheme } from '../../theme/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { SyncModule, BackgroundSync } = NativeModules;

const SettingsScreen = () => {
  const { t } = useTranslation();
  const { theme, isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets(); 
  
  const [isSyncEnabled, setIsSyncEnabled] = useState(true);

 const handleLanguageChange = async (lang: 'en' | 'ar') => {
  const isArabic = lang === 'ar';

  await AsyncStorage.setItem('appLang', lang);
  await i18n.changeLanguage(lang);

  if (I18nManager.isRTL !== isArabic) {
    I18nManager.allowRTL(isArabic);
    I18nManager.forceRTL(isArabic);

    RNRestart.Restart(); 
};
 }
  const startManualSync = () => {
    SyncModule.triggerSyncNow();
    Alert.alert(t('sync'), t('sync_triggered_successfully'));
  };

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'right', 'left']} 
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <CustomText style={[styles.backArrow, { color: theme.colors.primary }]}>‹</CustomText>
        </TouchableOpacity>
        <CustomText style={[styles.headerTitle, { color: theme.colors.textPrimary }]}>{t('settings')}</CustomText>
        <TouchableOpacity>
          <CustomText style={[styles.doneText, { color: theme.colors.primary }]}>{t('done')}</CustomText>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }} 
        style={styles.scrollContent}
      >
        {/* APPEARANCE SECTION */}
        <CustomText style={[styles.sectionLabel, { color: theme.colors.textSecondary }]}>{t('appearance')}</CustomText>
        <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
          
          <View style={styles.row}>
            <View style={styles.leftSide}>
              <View style={[styles.iconBox, styles.darkModeIcon]} />
              <CustomText style={[styles.rowText, { color: theme.colors.textPrimary }]}>{t('dark_mode')}</CustomText>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#3e3e3e', true: theme.colors.primary }}
              thumbColor={'#ffffff'}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.colors.background }]} />

          <View style={styles.row}>
            <View style={styles.leftSide}>
              <View style={[styles.iconBox, styles.langIcon]} />
              <CustomText style={[styles.rowText, { color: theme.colors.textPrimary }]}>{t('language')}</CustomText>
            </View>
            <View style={[styles.langContainer, { backgroundColor: isDark ? '#000' : '#f1f1f7' }]}>
              <TouchableOpacity
                onPress={() => handleLanguageChange('en')}
                style={[styles.langBtn, i18n.language === 'en' && { backgroundColor: theme.colors.primaryWithOpacity }]}
              >
                <CustomText style={{ color: i18n.language === 'en' ? theme.colors.primary : theme.colors.textSecondary }}>English</CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleLanguageChange('ar')}
                style={[styles.langBtn, i18n.language === 'ar' && { backgroundColor: theme.colors.primaryWithOpacity }]}
              >
                <CustomText style={{ color: i18n.language === 'ar' ? theme.colors.primary : theme.colors.textSecondary }}>Arabic</CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* SYSTEM SECTION */}
        <CustomText style={[styles.sectionLabel, styles.systemSectionMargin, { color: theme.colors.textSecondary }]}>
          {t('system')}
        </CustomText>
        <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
          <View style={styles.syncRow}>
            <View style={styles.flexOne}>
              <View style={styles.leftSide}>
                <View style={[styles.iconBox, { backgroundColor: theme.colors.successBg }]} />
                <CustomText style={[styles.rowText, { color: theme.colors.textPrimary }]}>{t('background_sync')}</CustomText>
                {isSyncEnabled && (
                  <View style={styles.activeBadge}>
                    <View style={[styles.dot, { backgroundColor: theme.colors.success }]} />
                    <CustomText style={[styles.activeText, { color: theme.colors.success }]}>{t('active')}</CustomText>
                  </View>
                )}
              </View>
              <CustomText style={[styles.descText, { color: theme.colors.textSecondary }]}>{t('sync_description')}</CustomText>
            </View>
            <Switch
              value={isSyncEnabled}
              onValueChange={(val) => {
                setIsSyncEnabled(val);
                if (val) BackgroundSync?.startRouteSync();
              }}
              trackColor={{ false: '#3e3e3e', true: theme.colors.primary }}
            />
          </View>
        </View>

        <TouchableOpacity onPress={startManualSync} style={[styles.manualBtn, { backgroundColor: theme.colors.primary }]}>
          <CustomText style={styles.manualBtnText}>{t('sync_now')}</CustomText>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  backArrow: { fontSize: 24 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  doneText: { fontWeight: 'bold' },
  scrollContent: { paddingHorizontal: 16 },
  sectionLabel: { fontSize: 12, fontWeight: '700', marginBottom: 8, marginLeft: 4 },
  systemSectionMargin: { marginTop: 24 },
  card: { borderRadius: 12, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  syncRow: { flexDirection: 'row', padding: 16 },
  leftSide: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 30, height: 30, borderRadius: 8, marginRight: 12 },
  darkModeIcon: { backgroundColor: '#312e81' },
  langIcon: { backgroundColor: '#9a3412' },
  rowText: { fontSize: 16, fontWeight: '500' },
  divider: { height: 1, marginStart: 58 }, 
  langContainer: { flexDirection: 'row', borderRadius: 8, padding: 2 },
  langBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  flexOne: { flex: 1 },
  activeBadge: { flexDirection: 'row', alignItems: 'center', marginLeft: 8 },
  activeText: { fontSize: 12 },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 4 },
  descText: { fontSize: 12, marginStart: 42, marginTop: 4 }, 
  manualBtn: { marginTop: 30, padding: 16, borderRadius: 10, alignItems: 'center' },
  manualBtnText: { color: '#fff', fontWeight: 'bold' }
});

export default SettingsScreen;
