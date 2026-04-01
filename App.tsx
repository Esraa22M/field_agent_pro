import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainTabs } from './src/navigation';

export default function App() {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}