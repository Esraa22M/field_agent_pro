import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme/themeContext';

type Props = {
  icon: any; 
  onPress: () => void;
  size?: number;
  color?: string;
  style?: any;
  backgroundColor?: string;
};

export default function IconButton({
  icon: Icon,
  onPress,
  size = 22,
  color,
  style,
  backgroundColor,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        backgroundColor && { backgroundColor },
        style,
      ]}
    >
      <Icon size={size} color={color || theme.colors.textPrimary} />
    </TouchableOpacity>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    button: {
      padding: theme.spacing.small,
      borderRadius: 1000,
      backgroundColor: theme.colors.closeBadge,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });