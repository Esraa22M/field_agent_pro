import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { loadShipments } from '../../store/slices/shipmentsSlice';
import { useTheme } from '../../theme/themeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AssignmentsHeader from '../../components/AssignmentsHeader';
import AssignmentItem from '../../components/assignmentList/AssignmentItem';
import { ActivityIndicator } from 'react-native';
import { useOrientation } from '../../hooks/useOrientation';
export default function AssignmentsList({ navigation }: { navigation: NavigationProp<any> }) {
  const dispatch = useDispatch<AppDispatch>();
  const { list: shipments, loading, error } = useSelector((state: RootState) => state.shipments);
  console.log('Shipments:', loading);
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const styles = createStyles(theme, insets);
  const orientation = useOrientation();
  const numColumns = orientation === 'landscape' ? 2 : 1;
  useEffect(() => {
    dispatch(loadShipments());
  }, [dispatch]);

  if (loading) return <ActivityIndicator style={styles.loadingText} size="large" color={theme.colors.primary} />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={styles.container}>
      <AssignmentsHeader title="My Assignments" />
      <FlatList
        data={shipments}
        key={numColumns}
        numColumns={numColumns}
        keyExtractor={(item) => item.order_id.toString()}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        renderItem={({ item }) => (
          <View style={numColumns > 1 ? styles.itemWrapper : undefined}>
            <AssignmentItem item={item} /></View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}
const createStyles = (theme: any, insets: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,

      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },

    row: {
      justifyContent: 'space-between',
      gap: theme.spacing.medium || 16,
    },
    itemWrapper: {
      flex: 1,
      marginBottom: 12, 
    },
    listContent: {
      paddingHorizontal: theme.spacing.medium || 16,
    },

    title: {
      fontSize: theme.fonts.size.medium || 16,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
    },

    loadingText: {
      padding: theme.spacing.medium || 16,
      fontSize: theme.fonts.size.medium || 16,
      color: theme.colors.textPrimary,
    },

    errorText: {
      padding: theme.spacing.medium || 16,
      color: theme.colors.error || 'red',
    },
  });