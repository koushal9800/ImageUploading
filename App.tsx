import React from "react";
import HomeScreen from "./src/screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationScreen from "./src/screens/NotificationScreen";
import { NavigationContainer } from "@react-navigation/native";
import NavigationService from "./src/services/NavigationService";


const Stack = createStackNavigator()

const App = () =>{
  return(
    <NavigationContainer>
      <Stack.Navigator ref={(ref)=>NavigationService.setTopLevelNavigator(ref)} >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Notification' component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App