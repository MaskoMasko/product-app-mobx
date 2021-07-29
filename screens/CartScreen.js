import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { store } from "../store/productStore";
import { observer } from "mobx-react";
import { CustBtn } from "../components/CustBtn";

//cart
export const CartScreen = observer(({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View>
        {store.state.cart.length == 0 ? (
          <Text>You haven't added any product in the cart...</Text>
        ) : (
          <ScrollView>
            {store.state.cart.map((e, i) => {
              return (
                <View key={i}>
                  <Text>{e}</Text>
                  <Button
                    title="remove item"
                    onPress={() => store.removeItemFromCart(i)}
                  ></Button>
                </View>
              );
            })}
          </ScrollView>
        )}
        <CustBtn
          title="GO BACK"
          onPress={() => navigation.navigate("Home")}
        ></CustBtn>
      </View>
    </View>
  );
});
