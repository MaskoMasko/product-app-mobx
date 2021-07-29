import React from "react";
import { View, Text, Button } from "react-native";
import { observer } from "mobx-react";

export const HomeScreen = observer(({ navigation }) => {
  //welcome to product page
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Hello User!</Text>
      <Text style={{ width: "80%" }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting since
      </Text>
      <Button
        title="Procdeed to continue to product page"
        onPress={() => navigation.navigate("Main Product Screen")}
      ></Button>
      <Button title="Your cart" onPress={()=>navigation.navigate("Cart")}></Button>
    </View>
  );
});
