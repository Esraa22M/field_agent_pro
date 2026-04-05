import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/themeContext';

interface Props {
  title: string;
  style?: any;
}

export default function HeaderTitle({ title, style }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return <Text style={[styles.title, style]}>{title}</Text>;
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    title: {
      fontSize: theme.fonts.size.xlarge || 18,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
  });