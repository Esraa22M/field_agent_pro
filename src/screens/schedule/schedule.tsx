import { StyleSheet, View } from "react-native";
import HeaderTitle from "../../components/headerTitle";
import { CalendarSection } from "../../components/schedule/calendarSection";
import { AgendaList } from "../../components/schedule/agendaList";
import { useTheme } from "../../theme/themeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCalendarData } from "../../hooks/useCalenderData";

export default function ScheduleScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { selectedDate, markedDates, dayTasks, isLoading, handleDayPress } = useCalendarData();

  const themedStyles = styles(theme, insets);

  return (
    <View style={themedStyles.container}>
      <View style={themedStyles.headerContainer}>
        <HeaderTitle title="Schedule" /> 
      </View>
      
      <CalendarSection 
        selectedDate={selectedDate} 
        markedDates={markedDates} 
        onDayPress={handleDayPress} 
      />

      <AgendaList 
        isLoading={isLoading} 
        tasks={dayTasks} 
        selectedDate={selectedDate} 
      />
    </View>
  );
}

const styles = (theme: any, insets: any) => StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: insets.top,
    paddingBottom: insets.bottom
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical: 10, 
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.card ,
  },
});
