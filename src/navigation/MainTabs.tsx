import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AssignmentsStack from './AssignmentsStack';
import { Schedule, Settings } from '../screens';
import { useTheme } from '../theme/themeContext';

const Tab = createBottomTabNavigator();
const IconComponent = MaterialCommunityIcons;

const tabs = [
  { name: 'Assignments', component: AssignmentsStack, icon: 'clipboard-text' },
  { name: 'Schedule', component: Schedule, icon: 'calendar-month' },
  { name: 'Settings', component: Settings, icon: 'cog' },
];

export default function MainTabs() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.card || '#fff',
          borderTopColor: 'transparent',
        },
      }}
    >
      {tabs.map(({ name, component, icon }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          listeners={({ navigation, route }) => ({
            tabPress: () => {
              const state = navigation.getState();
              const tab = state.routes.find(r => r.key === route.key);

              const index = tab?.state?.index ?? 0;

              if (index > 0) {
                navigation.navigate(route.name);
              }
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <IconComponent name={icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}