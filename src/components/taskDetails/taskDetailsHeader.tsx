import React from 'react';
import { View, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';
import HeaderTitle from '../headerTitle';
import IconButton from '../iconButton';
import { useTheme } from '../../theme/themeContext';
type Props = {
  orderId: number | string;
  onClose: () => void;
};

export default function TaskDetailsHeader({ orderId, onClose }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.headerRow}>
      <HeaderTitle title={`Task Details #${orderId}`} />

      <IconButton
        icon={X}
        onPress={onClose}
        size={20}
        color={theme.colors.textSecondary}
      />
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.large,
    },
  });