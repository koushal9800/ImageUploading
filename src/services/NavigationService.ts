import { CommonActions } from "@react-navigation/native";
import { createNavigationContainerRef } from "@react-navigation/native";

let navigator = null

export const navigationRef = createNavigationContainerRef()

function setTopLevelNavigator(navigationRef){
    navigator= navigationRef
}

function navigate(routeName,params){
    navigator?.navigate(routeName,params)
}

function goBack(){
    navigator.dispatch(CommonActions.goBack())
}

export default {
    setTopLevelNavigator,
    navigate,
    goBack
}