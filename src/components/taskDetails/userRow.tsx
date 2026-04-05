import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
    name: string | null;
    orderId: number | string;
    deliveryDate: string | null;
    theme: any;
};

export default function UserRow({ name, orderId, deliveryDate, theme }: Props) {
    const styles = createStyles(theme);

    return (
        <View style={styles.userRow}>
            <View style={styles.userInfo}>
                <View style={styles.avatar} />
                <View>
                    <Text style={styles.userName}>{name}</Text>
                    <Text style={styles.subText}>Recipient • #ORD-{orderId}</Text>
                </View>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.userName}>{deliveryDate}</Text>
                <Text style={styles.subText}>Expected</Text>
            </View>
        </View>
    );
}

function createStyles(theme: any) {
    return StyleSheet.create({
        userRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: theme.spacing.xlarge,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.closeBadge,
            paddingBottom: theme.spacing.xlarge,
        },
        userInfo: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
        },
        avatar: {
            width: 45,
            height: 45,
            borderRadius: 22,
            backgroundColor: theme.colors.closeBadge,
        },
        userName: {
            color: theme.colors.textPrimary,
            fontSize: theme.fonts.size.medium,
            fontWeight: '600',
        },
        subText: {
            color: theme.colors.textSecondary,
            fontSize: theme.fonts.size.medium,
            marginTop: 2,
        },
    });
}