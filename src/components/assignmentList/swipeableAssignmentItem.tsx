import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  runOnJS,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Trash2 } from 'lucide-react-native'; 
import AssignmentItem from './AssignmentItem';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { softDeleteShipment } from '../../store/slices/shipmentsSlice';
import { useTheme } from '../../theme/themeContext';

export default function SwipeableAssignmentItem({ item }: any) {
  const translateX = useSharedValue(0);
  const maxSwipe = -100;

  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handleDelete = (id: number) => {
    dispatch(softDeleteShipment(id));
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10]) 
    .failOffsetY([-5, 5])      
    .onUpdate((event) => {
      "use worklet"; 
      translateX.value = Math.min(0, Math.max(event.translationX, maxSwipe - 20));
    })
    .onEnd(() => {
      "use worklet"; 
      if (translateX.value <= maxSwipe / 1.5) {
        runOnJS(handleDelete)(item.order_id);
      }
      translateX.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => {
    "use worklet"; 
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const backgroundStyle = useAnimatedStyle(() => {
    "use worklet"; 
    const opacity = interpolate(
      translateX.value,
      [maxSwipe, 0],
      [1, 0], 
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    "use worklet"; 
    const scale = interpolate(translateX.value, [maxSwipe, 0], [1, 0.5], Extrapolate.CLAMP);
    const opacity = interpolate(translateX.value, [maxSwipe, -20], [1, 0], Extrapolate.CLAMP);
    
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        <Animated.View style={[styles.deleteBackground, backgroundStyle]}>
          <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
            <Trash2 color="white" size={24} strokeWidth={2.5} />
            <Text style={styles.deleteText}>DELETE</Text>
          </Animated.View>
        </Animated.View>
        
        <Animated.View style={animatedStyle}>
          <AssignmentItem item={item} />
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      backgroundColor: 'transparent',
      marginBottom: theme.spacing.cardGap || 12, 
    },
    deleteBackground: {
      ...StyleSheet.absoluteFillObject, 
      borderRadius: theme.spacing.borderRadius.large || 12,
      backgroundColor: theme.colors.error || '#FF3B30',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingRight: 25, 
      zIndex: -1      
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    deleteText: {
      color: 'white',
      fontSize: 10,
      fontWeight: '900',
      marginTop: 4,
      letterSpacing: 0.5,
    },
  });
