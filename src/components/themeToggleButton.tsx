import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { RefreshCcw } from 'lucide-react-native';

import { useTheme } from '../theme/themeContext'
const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme()
  const styles = createStyles(theme)
  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.button}>
      <RefreshCcw  size={20} color={styles.icon.color}/>
    </TouchableOpacity>
  )
}
export default ThemeToggleButton

const createStyles = (theme: any) =>
  StyleSheet.create({
    button: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.card,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.card,
    },
    icon: {
      color: theme.colors.primary,
    },
  })