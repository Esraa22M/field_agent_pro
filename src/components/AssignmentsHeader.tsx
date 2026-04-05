import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/themeContext';
import ThemeToggleButton from './themeToggleButton';
import HeaderTitle from './headerTitle';
interface AssignmentsHeaderProps {
  title: string;
}

export default function AssignmentsHeader({ title }: AssignmentsHeaderProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.header}>
      <HeaderTitle title={title} />
      <ThemeToggleButton />
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      paddingHorizontal: theme.spacing.medium || 16,
    },

    
  });