import React from 'react';
import { StyleSheet, View, Text, I18nManager } from 'react-native';
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
import { Shipment } from '../../types/flatShipmentsTyes';

interface AssignmentItemProps {
  item: Shipment;
}

const isRTL = I18nManager.isRTL;

export default function SwipeableAssignmentItem({ item }: AssignmentItemProps) {
  const translateX = useSharedValue(0);
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const SWIPE_LIMIT = isRTL ? 80 : -80;

  const handleDelete = () => {
    dispatch(softDeleteShipment(item.order_id));
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX(isRTL ? [10, 20] : [-20, -10]) 
    .onUpdate((event) => {
      "use worklet";
      if (isRTL) {
        translateX.value = Math.max(0, event.translationX);
      } else {
        translateX.value = Math.min(0, event.translationX);
      }
    })
    .onEnd(() => {
      "use worklet";
      const absTranslateX = Math.abs(translateX.value);
      if (absTranslateX > 60) {
        runOnJS(handleDelete)();
      }
      translateX.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backgroundStyle = useAnimatedStyle(() => {
    "use worklet";
    const input = isRTL ? [0, 80] : [-80, 0];
    const output = isRTL ? [0, 1] : [1, 0];

    return {
      opacity: interpolate(translateX.value, input, output, Extrapolate.CLAMP),
    };
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    "use worklet";
    const input = isRTL ? [0, 80] : [-80, 0];
    const scaleOutput = isRTL ? [0, 1] : [1, 0];

    return {
      transform: [{ 
        scale: interpolate(translateX.value, input, scaleOutput, Extrapolate.CLAMP) 
      }],
      opacity: interpolate(translateX.value, input, scaleOutput, Extrapolate.CLAMP),
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        <Animated.View style={[styles.deleteBackground, backgroundStyle]}>
          <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
            <Trash2 color="white" size={24} strokeWidth={2.5} />
            <Text style={styles.deleteText}>{isRTL ? "حذف" : "DELETE"}</Text>
          </Animated.View>
        </Animated.View>

        <Animated.View style={animatedStyle}>
          <AssignmentItem item={item} />
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'transparent',
    marginBottom: theme.spacing?.cardGap || 12,
  },
  deleteBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: theme.spacing?.borderRadius?.large || 12,
    backgroundColor: theme.colors?.error || '#FF3B30',
    flexDirection: 'row',
    
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '900',
    marginTop: 2,
  },
});
