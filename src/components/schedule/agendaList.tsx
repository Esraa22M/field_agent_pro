import React from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AssignmentItem from './taskItem';
import { useTheme } from '../../theme/themeContext';

interface Props {
    isLoading: boolean;
    tasks: any[];
    selectedDate: string;
}

export const AgendaList = ({ isLoading, tasks, selectedDate }: Props) => {
    const { theme } = useTheme();

    const themedStyles = styles(theme);

    return (
        <View style={themedStyles.container}>
            <View style={themedStyles.header}>
                <Text style={themedStyles.headerTitle}>
                    Agenda for {selectedDate}
                </Text>
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color={theme.colors.primary} style={themedStyles.loader} />
            ) : (
                <FlatList
                    data={tasks}
                    renderItem={({ item }) => <AssignmentItem item={item} />}
                    keyExtractor={(item) => item.order_id.toString()}
                    contentContainerStyle={themedStyles.listContent}
                    ListEmptyComponent={
                        <View style={themedStyles.emptyContainer}>
                            <Text style={themedStyles.emptyText}>No tasks for this day</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
};

const styles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        padding: 16,
        paddingBottom: 16,
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: theme.colors.card || '#E0E0E0'
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 16,
        color: theme.colors.textPrimary
    },
    loader: {
        marginTop: 20
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 40
    },
    emptyContainer: {
        marginTop: 50,
        alignItems: 'center'
    },
    emptyText: {
        color: theme.colors.textSecondary || '#8E8E93',
        fontSize: 14
    },
});
