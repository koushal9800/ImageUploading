import React from "react";
import { View, Text, Button, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/ProductSlice";

const NotificationScreen = () => {
  const dispatch = useDispatch();
  const { data, isLoader, isError } = useSelector((state) => state.product); // Fix state selection

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      {/* <Button title="Fetch Products" onPress={() => dispatch(fetchProducts())} /> */}

      
      {isLoader && <ActivityIndicator size="large" color="blue" style={{ marginTop: 10 }} />}

      
      {isError && <Text style={{ color: "red", marginTop: 10 }}>Failed to load products.</Text>}

      
      {data && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10, padding: 10, backgroundColor: "#eee", borderRadius: 5 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold",color:'red' }}>{item.title}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default NotificationScreen;
