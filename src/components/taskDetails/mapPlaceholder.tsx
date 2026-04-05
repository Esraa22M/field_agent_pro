import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/themeContext';
type Props = {
  staticText?: string;
};

export default function MapPlaceholder({ staticText = 'Static Map Image' }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{staticText}</Text>
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      height: 160,
      backgroundColor: theme.colors.card,
      borderRadius: theme.spacing.borderRadius.large,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.large,
      borderWidth: 1,
      borderColor: theme.colors.textSecondary,
    },
    text: {
      color: theme.colors.textSecondary,
    },
  });