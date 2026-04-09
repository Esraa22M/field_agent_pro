import React from 'react';
import {
  Text,
  TextProps,
  StyleSheet,
  StyleProp,
  TextStyle,
  I18nManager
} from 'react-native';
import { useTranslation } from 'react-i18next';
type CustomTextProps = TextProps & {
  children: string | React.ReactNode;  
  style?: StyleProp<TextStyle>;
  params?: Record<string, any>;        
};

const CustomText: React.FC<CustomTextProps> = ({
  children,
  style,
  params,
  ...props
}) => {
  const { t } = useTranslation();

  const translatedText =
    typeof children === 'string' ? t(children, params) : children;

  const textStyle = [
    styles.text,
   
    style,
  ];

  return (
    <Text
      style={textStyle}
      {...props}
    >
      {translatedText}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  },
 
});

export default CustomText;