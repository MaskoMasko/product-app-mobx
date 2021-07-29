import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { store } from "../store/productStore";
import { observer } from "mobx-react";

//cart
export const CartScreen = observer(({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ScrollView>
        {store.state.cart.map((e, i) => {
          return (
            <View key={i}>
              <Text>{e}</Text>
              <Button title="remove item" onPress={()=>store.removeItemFromCart(i)}></Button>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
});
