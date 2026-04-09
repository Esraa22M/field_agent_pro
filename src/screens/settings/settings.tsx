import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Moon, Globe, RefreshCw } from 'lucide-react-native';
import CustomText from '../../components/customText';
import { useTheme } from '../../theme/themeContext';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const { t } = useTranslation();
  const { theme, isDark, toggleTheme } = useTheme();
  const [isSyncEnabled, setIsSyncEnabled] = useState(true);
  const navigation = useNavigation<any>(); 

  const handleDone = () => {
    navigation.navigate('Assignments');
  };
   const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Assignments' as never);
    }
  };

  const { colors } = theme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={handleBack}>
          <ChevronLeft size={28} color={colors.primary} />
        </TouchableOpacity>
        <CustomText style={[styles.headerTitle, { color: colors.textPrimary }]}>
          {t('settings')}
        </CustomText>
        <TouchableOpacity style={styles.headerBtn} onPress={handleDone}>
          <CustomText style={[styles.doneText, { color: colors.primary }]}>
            {t('done')}
          </CustomText>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* APPEARANCE SECTION */}
        <CustomText style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          {t('appearance').toUpperCase()}
        </CustomText>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          {/* Dark Mode Row */}
          <View style={styles.row}>
            <View style={styles.leftSide}>
              <View style={[styles.iconBox, { backgroundColor: isDark ? '#262A4D' : '#E0E7FF' }]}>
                <Moon size={18} color={isDark ? '#818CF8' : '#4F46E5'} fill={isDark ? '#818CF8' : 'none'} />
              </View>
              <CustomText style={[styles.rowLabel, { color: colors.textPrimary }]}>
                {t('dark_mode')}
              </CustomText>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#3e3e3e', true: colors.primary }}
              thumbColor={'#FFFFFF'}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.background }]} />

          {/* Language Row */}
          <View style={styles.languageContainer}>
            <View style={styles.leftSide}>
              <View style={[styles.iconBox, { backgroundColor: isDark ? '#4C2D1A' : '#FFEDD5' }]}>
                <Globe size={18} color={isDark ? '#FB923C' : '#D97706'} />
              </View>
              <CustomText style={[styles.rowLabel, { color: colors.textPrimary }]}>
                {t('language')}
              </CustomText>
            </View>

            <View style={[styles.toggleWrapper, { backgroundColor: colors.background }]}>
              <TouchableOpacity
                onPress={() => i18n.changeLanguage('en')}
                style={[
                  styles.toggleBtn,
                  i18n.language === 'en' && (isDark ? styles.activeToggleDark : styles.activeToggleLight)
                ]}
              >
                <CustomText style={[
                  styles.toggleText,
                  { color: i18n.language === 'en' ? colors.primary : colors.textSecondary }
                ]}>
                  English
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => i18n.changeLanguage('ar')}
                style={[
                  styles.toggleBtn,
                  i18n.language === 'ar' && (isDark ? styles.activeToggleDark : styles.activeToggleLight)
                ]}
              >
                <CustomText style={[
                  styles.toggleText,
                  { color: i18n.language === 'ar' ? colors.primary : colors.textSecondary }
                ]}>
                  Arabic
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* SYSTEM SECTION */}
        <CustomText style={[styles.sectionLabel, styles.systemMargin, { color: colors.textSecondary }]}>
          {t('system').toUpperCase()}
        </CustomText>

        <View style={[styles.card, styles.systemCard, { backgroundColor: colors.card }]}>
          <View style={styles.syncHeader}>
            <View style={styles.leftSide}>
              <View style={[styles.iconBox, { backgroundColor: colors.successBg }]}>
                <RefreshCw size={18} color={colors.success} />
              </View>
              <CustomText style={[styles.rowLabel, { color: colors.textPrimary }]}>
                {t('background_sync')}
              </CustomText>
            </View>
            {isSyncEnabled && (
              <View style={styles.statusBadge}>
                <View style={[styles.dot, { backgroundColor: colors.success }]} />
                <CustomText style={[styles.statusText, { color: colors.success }]}>
                  {t('active')}
                </CustomText>
              </View>
            )}
          </View>

          <View style={styles.syncMeta}>
            <CustomText style={[styles.syncDesc, { color: colors.textSecondary }]}>
              {t('sync_description')}
            </CustomText>
            <CustomText style={[styles.lastSync, { color: colors.textSecondary }]}>
              Last sync: 10:00 AM
            </CustomText>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <CustomText style={[styles.footerText, { color: colors.textSecondary }]}>FieldAgent Pro v1.0.0</CustomText>
          <CustomText style={[styles.footerSubText, { color: colors.textSecondary }]}>ID: 8829-ADX-22</CustomText>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 56,
  },
  headerBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  doneText: {
    fontSize: 17,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    marginLeft: 4,
  },
  systemMargin: {
    marginTop: 24,
  },
  card: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  systemCard: {
    padding: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginLeft: 60,
  },
  languageContainer: {
    padding: 16,
  },
  toggleWrapper: {
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 14,
    padding: 3,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeToggleDark: {
    backgroundColor: '#2D333B',
  },
  activeToggleLight: {
    backgroundColor: '#F0F0F0',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
  },
  syncHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  syncMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingLeft: 44,
  },
  syncDesc: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
  },
  lastSync: {
    fontSize: 11,
    marginLeft: 10,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 13,
  },
  footerSubText: {
    fontSize: 11,
    marginTop: 4,
  },
});

export default SettingsScreen;
