import React, { useRef, useMemo, useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from 'react-native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { ShipmentsRepo } from '../../../data/dbOrm/repositories/shipmentsRepo';
import { Shipment } from '../../types/flatShipmentsTyes';
import { useTheme } from '../../theme/themeContext';
import UserRow from '../../components/taskDetails/userRow';
import TaskCard from '../../components/taskDetails/taskCard';
import MapPlaceholder from '../../components/taskDetails/mapPlaceholder';
import TaskDetailsHeader from '../../components/taskDetails/taskDetailsHeader';
export default function AssignmentDetails({ route }: { route: any }) {
  const { taskId } = route.params;
  const [task, setTask] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['60%', '90%'], []);
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const result = await ShipmentsRepo.getTaskById(Number(taskId));
        if (result) {
          setTask({
            ...result,
            latitude: result.latitude ?? 0,
            longitude: result.longitude ?? 0,
            is_deleted: !!result.is_deleted,
          });
          setTimeout(() => {
            bottomSheetRef.current?.expand();
          }, 100);
        }
      } catch (error) {
        console.error('Error fetching task:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleCall = () => {
    if (task?.contact_phone) {
      Linking.openURL(`tel:${task.contact_phone}`);
    }
  };

  const handleNavigate = () => {
    if (task?.latitude && task?.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${task.latitude},${task.longitude}`;
      Linking.openURL(url);
    }
  };

  const handleClose = () => {
    bottomSheetRef.current?.close();
    navigation.goBack();
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: theme.colors.background }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.textSecondary }}
    >
      <BottomSheetView style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loadingIndicator} />
        ) : task ? (
          <>
            <TaskDetailsHeader orderId={`Task #${task.order_id}`} onClose={handleClose} />
            {/* Map */}
            <MapPlaceholder staticText={'Map Placeholder'} />

            <TaskCard address={task.delivery_address} company={task.client_company} notes={task.notes} onCall={handleCall} onNavigate={handleNavigate} theme={theme} />

           <UserRow
              name={task.customer_name}
              orderId={task.order_id}
              deliveryDate={task.delivery_date}
              theme={theme} />

          </>
        ) : (
          <Text style={styles.notFoundText}>Task not found</Text>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}

function createStyles(theme: any) {
  return StyleSheet.create({
    content: { flex: 1, paddingHorizontal: theme.spacing.large },
    loadingIndicator: { marginTop: theme.spacing.xlarge },
    mapPlaceholder: { height: 160, backgroundColor: theme.colors.card, borderRadius: theme.spacing.borderRadius.large, justifyContent: 'center', alignItems: 'center', marginBottom: theme.spacing.large, borderWidth: 1, borderColor: theme.colors.textSecondary },
    notFoundText: { color: theme.colors.textPrimary, textAlign: 'center' },
  });
}