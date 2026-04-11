import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MapPin, Phone } from 'lucide-react-native';
import { useTheme } from '../../theme/themeContext';
import { withOpacity } from '../../utils/utils';
import { Shipment } from '../../types/flatShipmentsTyes';
interface AssignmentItemProps {
  item: Shipment;
}
export default function AssignmentItem({ item }: AssignmentItemProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme, item.status || 'pending');

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>

      {/* Status + Time */}
      <View style={styles.topRow}>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {item?.status?.toUpperCase() || 'PENDING'}
          </Text>
        </View>

        <Text style={styles.timeText}>
          {item?.delivery_date || '09:00 AM - 10:30 AM'}
        </Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>
        {item?.client_company || `Task #${item?.order_id}`}
      </Text>

      {/* Location */}
      <View style={styles.row}>
        <MapPin size={14} color={theme.colors.textSecondary} />
        <Text style={styles.subText}>
          {item?.delivery_address || item?.client_company}
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Navigate</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn}>
          <Phone size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

    </TouchableOpacity>
  );
}

const createStyles = (theme: any, status: string) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,
      paddingVertical: 16,
      paddingRight: 16,
      paddingLeft: 12,
      borderRadius: 16,
      marginBottom: 12,
      borderWidth: 0.1,
      borderColor: theme.colors.textSecondary || '#8E8E93',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
      elevation: 1,
      borderLeftWidth: 5,
      borderLeftColor: theme.colors[status || 'pending'] || '#0A84FF',


    },

    topRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: 10,
      marginBottom: 8,
    },

    statusBadge: {
      backgroundColor: withOpacity(
        theme.colors[status || 'pending'] || '#0A84FF',
        0.2
      ),
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8000,
    },

    statusText: {
      fontSize: 10,
      fontWeight: '700',
      color: theme.colors[status || 'pending'] || '#0A84FF',
    },

    timeText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },

    title: {
      fontSize: 16,
      fontWeight: '700',
      color: '#fff',
      marginBottom: 6,
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: 12,
    },

    subText: {
      fontSize: 13,
      color: theme.colors.textSecondary,
    },

    actionsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },

    primaryBtn: {
      backgroundColor: '#0A84FF',
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 10,
    },

    primaryBtnText: {
      color: '#fff',
      fontSize: 13,
      fontWeight: '600',
    },

    iconBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.hint,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });