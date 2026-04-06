import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '../../theme/themeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChevronLeft, ChevronRight } from 'lucide-react-native';

import AssignmentItem from '../../components/schedule/taskItem';
import { Shipment } from '../../types/flatShipmentsTyes';
import { ShipmentsRepo } from '../../../data/dbOrm/repositories/shipmentsRepo';

interface MarkedDates {
  [date: string]: {
    dots?: Array<{ key: string; color: string }>;
    selected?: boolean;
    selectedColor?: string;
  };
}

export default function ScheduleScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [dayTasks, setDayTasks] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCalendarMarkers = async () => {
    try {
      const allTasks = await ShipmentsRepo.getAllLocal();
      const marks: MarkedDates = {};

      allTasks.forEach((task) => {
        const dateKey = task.delivery_date?.split('T')[0];

        if (dateKey) {
          if (!marks[dateKey]) {
            marks[dateKey] = { dots: [] };
          }
          const dotColor = task.status === 'Completed' ? '#808080' : '#4CAF50';

          if (marks[dateKey].dots!.length < 2) {
            marks[dateKey].dots!.push({ key: task.order_id.toString(), color: dotColor });
          }
        }
      });
      setMarkedDates(marks);
    } catch (error) {
      console.error("Error loading markers:", error);
    }
  };

  const fetchTasksForDate = async (date: string) => {
    setIsLoading(true);
    try {
      const tasks = await ShipmentsRepo.getTasksByDate(date);
      setDayTasks(tasks as unknown as Shipment[]);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendarMarkers();
    fetchTasksForDate(selectedDate);
  }, []);

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    fetchTasksForDate(day.dateString);
  };

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: theme.colors.background,
        paddingTop: insets.top,
        paddingBottom: insets.bottom
      }
    ]}>

      <Calendar
        enableSwipeMonths={true}
        current={selectedDate}
        markingType={'multi-dot'}
        onDayPress={onDayPress}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            ...markedDates[selectedDate],
            selected: true,
            selectedColor: theme.colors.primary
          }
        }}
        style={{

          backgroundColor: theme.colors.background,
          height: 350
        }}
        renderArrow={(direction) => (
          direction === 'left' ? (
            <ChevronLeft color={theme.colors.primary} size={28} strokeWidth={2.5} />
          ) : (
            <ChevronRight color={theme.colors.primary} size={28} strokeWidth={2.5} />
          )
        )}

        theme={{calendarBackground:"transparent"}}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Agenda for {selectedDate}</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={dayTasks}
          renderItem={({ item }) => <AssignmentItem item={item} />}
          keyExtractor={(item) => item.order_id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No tasks for this day</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    padding: 16,
    paddingBottom: 8,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  emptyContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  emptyText: {
    color: '#8E8E93',
    fontSize: 14,
  },
});
