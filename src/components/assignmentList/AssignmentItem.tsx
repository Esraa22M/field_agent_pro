import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Building2, User, ChevronRight } from 'lucide-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Shipment } from '../../types/flatShipmentsTyes';
import { useTheme } from '../../theme/themeContext';
import { AssignmentsStackParamList } from '../../navigation/AssignmentsStack';

interface AssignmentItemProps {
    item: Shipment;
}

type AssignmentItemNavigationProp = StackNavigationProp<
  AssignmentsStackParamList,
  'AssignmentsMain'
>;
export default function AssignmentItem({ item }: AssignmentItemProps) {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const secondaryColor = theme.colors.textSecondary || '#8E8E93';

    const navigation = useNavigation<AssignmentItemNavigationProp>();

    const handlePress = () => {
        navigation.navigate('TaskDetails', { taskId: String(item.order_id) });
    };

    return (
        <TouchableOpacity
            style={styles.item}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View style={styles.mainContent}>
                <View style={styles.headerRow}>
                    <Text style={styles.orderId}>Task #{item?.order_id}</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item?.status || 'Active'}</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <Building2 size={16} color={secondaryColor} strokeWidth={2} />
                    <Text style={styles.infoText}>{item?.client_company}</Text>
                </View>

                <View style={styles.infoRow}>
                    <User size={16} color={secondaryColor} strokeWidth={2} />
                    <Text style={styles.infoText}>Agent: {item?.customer_name}</Text>
                </View>
            </View>

            <ChevronRight size={20} color={secondaryColor} strokeWidth={1.5} />
        </TouchableOpacity>
    );
}

const createStyles = (theme: any) =>
    StyleSheet.create({
        item: {
            padding: theme.spacing.medium || 16,
            backgroundColor: theme.colors.card || '#1C1C1E',
            borderRadius: theme.spacing.borderRadius.large || 12,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 0.1,
            borderColor: theme.colors.textSecondary || '#8E8E93',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 2,
            elevation: 1,
        },
        mainContent: { flex: 1,           
 },
        headerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
        },
        orderId: {
            fontSize: 17,
            fontWeight: '700',
            color: theme.colors.textPrimary || '#FFFFFF',
        },
        badge: {
            backgroundColor: 'rgba(52, 199, 89, 0.15)',
            paddingVertical: theme.spacing.xs || 4,
            paddingHorizontal: theme.spacing.small || 8,
            borderRadius: theme.spacing.borderRadius.medium || 6,
            marginRight: theme.spacing.medium || 16,
        },
        badgeText: {
            color: theme.colors.success || '#34C759',
            fontSize: 11,
            fontWeight: 'bold',
            textTransform: 'uppercase',
        },
        infoRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: theme.spacing.small || 8,
            gap: theme.spacing.small || 8,
        },
        infoText: {
            fontSize: 14,
            color: theme.colors.textSecondary || '#8E8E93',
        },
    });