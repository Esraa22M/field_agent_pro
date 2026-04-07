import { useState, useEffect, useCallback } from 'react';
import { Shipment } from '../types/flatShipmentsTyes';
import { ShipmentsRepo } from '../../data/dbOrm/repositories/shipmentsRepo';
interface MarkedDates {
  [date: string]: {
    dots?: Array<{ key: string; color: string }>;
    selected?: boolean;
    selectedColor?: string;
  };
}

export const useCalendarData = () => {
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
          if (!marks[dateKey]) marks[dateKey] = { dots: [] };
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

  const fetchTasksForDate = useCallback(async (date: string) => {
    setIsLoading(true);
    try {
      const tasks = await ShipmentsRepo.getTasksByDate(date);
      setDayTasks(tasks as unknown as Shipment[]);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCalendarMarkers();
    fetchTasksForDate(selectedDate);
  }, []);

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    fetchTasksForDate(day.dateString);
  };

  return {
    selectedDate,
    markedDates,
    dayTasks,
    isLoading,
    handleDayPress,
    refreshTasks: () => fetchTasksForDate(selectedDate) 
  };
};
