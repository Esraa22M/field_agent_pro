import React from 'react';
import { Calendar } from 'react-native-calendars';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useTheme } from '../../theme/themeContext';

interface Props {
  selectedDate: string;
  markedDates: any;
  onDayPress: (day: any) => void;
}

export const CalendarSection = ({ selectedDate, markedDates, onDayPress }: Props) => {
  const { theme } = useTheme();

  return (
    <Calendar
      enableSwipeMonths
      current={selectedDate}
      markingType={'multi-dot'}
      onDayPress={onDayPress}
      markedDates={{
        ...markedDates,
        [selectedDate]: {
          ...markedDates[selectedDate],
          selected: true,
          selectedColor: theme.colors.primary,
        },
      }}
      style={{ backgroundColor: theme.colors.background, height: 350 }}
      renderArrow={(dir) => 
        dir === 'left' ? 
        <ChevronLeft color={theme.colors.textPrimary} size={28} strokeWidth={2.5} /> : 
        <ChevronRight color={theme.colors.textPrimary} size={28} strokeWidth={2.5} />
      }
      theme={{
        backgroundColor: "transparent",
        calendarBackground: 'transparent',
        textMonthFontWeight: 'bold',
        textMonthFontSize: 18,
        dayTextColor: theme.colors.textSecondary,
        todayTextColor: theme.colors.primary,
        selectedDayTextColor: '#FFFFFF',
        textDisabledColor: theme.colors.textPrimary,
      }}
    />
  );
};
