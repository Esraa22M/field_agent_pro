import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { useTheme } from '../theme/themeContext';
import { LucideIcon } from 'lucide-react-native'; 

interface CustomButtonProps {
  text: string;
  backgroundColor?: string;
  onPress: () => void;
  style?: ViewStyle; 
  textStyle?: TextStyle;
  icon?: LucideIcon; 
  iconSize?: number;
  iconColor?: string;
  fixedWidth?: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  text, 
  backgroundColor, 
  onPress, 
  style, 
  textStyle,
  icon: Icon, 
  iconSize = 20,
  iconColor = '#fff',
  fixedWidth,
}) => {
  const { theme } = useTheme();
  const dynamicStyles = createStyles(theme);

  return (
    <TouchableOpacity 
      style={[
        dynamicStyles.button, 
        { backgroundColor: backgroundColor || theme.colors.primary },
        fixedWidth ? { width: fixedWidth } : {},
        style
      ]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={dynamicStyles.content}>
        {Icon && <Icon size={iconSize} color={iconColor} style={dynamicStyles.icon} />}
        <Text style={[dynamicStyles.buttonText, textStyle]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.medium,
    borderRadius: theme.spacing.borderRadius.large,
    alignItems: 'center',       
    justifyContent: 'center',   
    borderWidth: 0,             
  },
  content: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: theme.spacing.small,
  },
  buttonText: {
    color: '#fff', 
    fontSize: theme.fonts.size.medium,
    fontWeight: 'bold',
    textAlign: 'center',        
  },
});

export default CustomButton;