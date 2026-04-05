import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
// استيراد الـ Selector الجديد من الـ Slice
import { loadShipments, selectActiveShipments } from '../../store/slices/shipmentsSlice';
import { useTheme } from '../../theme/themeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AssignmentsHeader from '../../components/AssignmentsHeader';
import { useOrientation } from '../../hooks/useOrientation';
import SwipeableAssignmentItem from '../../components/assignmentList/swipeableAssignmentItem';

export default function AssignmentsList() {
  const dispatch = useDispatch<AppDispatch>();

  const shipments = useSelector(selectActiveShipments);
  const { loading, error } = useSelector((state: RootState) => state.shipments);

  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);

  const orientation = useOrientation();
  const numColumns = orientation === 'landscape' ? 2 : 1;

  useEffect(() => {
    dispatch(loadShipments());
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator style={styles.loadingText} size="large" color={theme.colors.primary} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <AssignmentsHeader title="My Assignments" />
      <FlatList
        data={shipments}
        key={numColumns}
        numColumns={numColumns}
        ItemSeparatorComponent={() => (
          <View style={{ height: theme.spacing.cardGap || 12 }} />
        )}
        keyExtractor={(item) => item.order_id.toString()}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        renderItem={({ item }) => (
          <View style={numColumns > 1 ? styles.itemWrapper : undefined}>
            <SwipeableAssignmentItem item={item} />
          </View>
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
    loadingText: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      padding: theme.spacing.medium || 16,
      color: theme.colors.error || 'red',
      textAlign: 'center',
    },
  });
