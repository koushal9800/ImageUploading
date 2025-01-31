import React from "react";
import HomeScreen from "./src/screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationScreen from "./src/screens/NotificationScreen";
import { NavigationContainer } from "@react-navigation/native";
import NavigationService from "./src/services/NavigationService";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
store

const Stack = createStackNavigator()

const App = () =>{
  return(
    <NavigationContainer>
      <Provider store={store} >
      <Stack.Navigator ref={(ref)=>NavigationService.setTopLevelNavigator(ref)} >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Notification' component={NotificationScreen} />
      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}

export default App