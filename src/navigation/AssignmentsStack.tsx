import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AssignmentDetails ,AssignmentsList} from '../screens';

export type AssignmentsStackParamList = {
  AssignmentsMain: undefined;
  TaskDetails: { taskId?: string }; 
};

const Stack = createStackNavigator<AssignmentsStackParamList>();


export default function AssignmentsStack() {
  return (
    <Stack.Navigator
      initialRouteName="AssignmentsMain"
      screenOptions={{
        headerShown: true, 
      }}
    >
      <Stack.Screen
        name="AssignmentsMain"
        component={AssignmentsList}
        options={{ title: 'Assignments' }}
      />
      <Stack.Screen
        name="TaskDetails"
        component={AssignmentDetails}
        options={{ title: 'Task Details' }}
      />
    </Stack.Navigator>
  );
}