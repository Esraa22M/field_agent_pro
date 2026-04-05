import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Archive, Phone, Navigation } from 'lucide-react-native';
import CustomButton from '../customButton';

type Props = {
  address: string|null;
  company: string|null;
  notes?: string|null;
  onCall: () => void;
  onNavigate: () => void;
  theme: any;
};

export default function TaskCard({
  address,
  company,
  notes,
  onCall,
  onNavigate,
  theme,
}: Props) {
  const styles = createStyles(theme);

  return (
    <View style={styles.card}>
      <View style={styles.infoRow}>
        <View style={styles.iconBox}>
          <Archive size={20} color={theme.colors.primary} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.addressText}>{address}</Text>
          <Text style={styles.subText}>
            {company} • Notes: {notes || 'N/A'}
          </Text>
        </View>
      </View>

      <View style={styles.buttonsRow}>
        <CustomButton
          text="Navigate"
          icon={Navigation}
          iconSize={18}
          onPress={onNavigate}
          backgroundColor={theme.colors.primary}
          style={styles.navigateBtn}
        />

        <CustomButton
          text="Call"
          icon={Phone}
          onPress={onCall}
          backgroundColor={theme.colors.hint}
          iconColor={theme.colors.darkText}
          textStyle={{ color: theme.colors.darkText }}
          style={styles.callBtn}
        />
      </View>
    </View>
  );
}

function createStyles(theme: any) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,
      padding: theme.spacing.large,
      borderRadius: theme.spacing.borderRadius.large,
      marginBottom: theme.spacing.large,
      borderWidth: 0.1,
      borderColor: theme.colors.card,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
      elevation: 1,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.small,
      gap: 12,
    },
    iconBox: {
      backgroundColor: theme.colors.primaryWithOpacity,
      padding: theme.spacing.small,
      borderRadius: theme.spacing.borderRadius.medium,
    },
    addressText: {
      color: theme.colors.textPrimary,
      fontSize: theme.fonts.size.large,
      fontWeight: '600',
    },
    subText: {
      color: theme.colors.textSecondary,
      fontSize: theme.fonts.size.medium,
      marginTop: 2,
    },
    buttonsRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 12,
      gap: 10,
    },
    callBtn: {
      width: 140,
      borderWidth: 0.1,
      borderColor: theme.colors.textSecondary,
    },
    navigateBtn: {
      width: 140,
      borderWidth: 0.1,
      borderColor: theme.colors.textSecondary,
    },
  });
}