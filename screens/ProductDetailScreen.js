import React from "react";
import { View, Text, Button } from "react-native";
import { store } from "../store/productStore";
import { observer } from "mobx-react";

//Product details
export const ProductDetailScreen = observer(({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Text>{store.state.chosenProduct}</Text>
      <Button
        title="Add Item To Cart"
        onPress={() => {
          store.addItemToCart(store.state.chosenProduct);
          navigation.navigate("Cart");
        }}
      ></Button>
      <Button title="Go Back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
});
