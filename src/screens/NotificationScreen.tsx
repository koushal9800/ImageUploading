import React from "react";
import {View,Text, Button} from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/ProductSlice";

const NotificationScreen = () =>{
  const dispatch =useDispatch()
  const products = useSelector(state => state)
  console.log('products',products)
  return(
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }} >
   <Button title="Go To Notification" onPress={()=>dispatch(fetchProducts())} />
    </View>
  )
}

export default NotificationScreen