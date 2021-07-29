import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { store } from "../store/productStore";
import { observer } from "mobx-react";

//then u go in
export const MainProductScreen = observer(({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ScrollView>
        {store.state.dataFetched.map((e, i) => {
          return (
            <TouchableOpacity
              onPress={() => {
                store.selectedProduct(e);
                navigation.navigate("Product Details");
              }}
              key={i}
              style={{
                width: 150,
                height: 150,
                backgroundColor: "red",
                margin: 10,
              }}
            >
              <Text>{e}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
});
