import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { observer } from "mobx-react";
import { CustBtn } from "../components/CustBtn";

export const HomeScreen = observer(({ navigation }) => {
  //welcome to product page
  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#fff6cc" }}>
      <Text style={[styles.greetingText, { fontSize: 24, marginTop: 200 }]}>
        Hello User!
      </Text>
      <Text style={[styles.greetingText, { width: "80%" }]}>
        Lorem Ipsum is simply dummy text of the printing and typesetting since
      </Text>
      <CustBtn
        title="PROCEED TO PRODUCT PAGE"
        onPress={() => navigation.navigate("ProductList")}
      ></CustBtn>
      <CustBtn
        title="YOUR CART"
        onPress={() => navigation.navigate("Cart")}
      ></CustBtn>
    </View>
  );
});

const styles = StyleSheet.create({
  greetingText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
});
