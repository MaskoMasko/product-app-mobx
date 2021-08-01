import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";
import { HomeScreen } from "./screens/HomeScreen";
import { MainProductScreen } from "./screens/MainProductScreen";
import { ProductDetailScreen } from "./screens/ProductDetailScreen";
import { CartScreen } from "./screens/CartScreen";
import { FilterScreen } from "./screens/FilterScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            title: "Welcome To Product App",
            headerStyle: { backgroundColor: "orange" },
          }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerStyle: { backgroundColor: "orange" } }}
          name="ProductList"
          component={MainProductScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="ProductDetails"
          options={{ headerStyle: { backgroundColor: "orange" } }}
          component={ProductDetailScreen}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerStyle: { backgroundColor: "orange" } }}
          name="Cart"
          component={CartScreen}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerStyle: { backgroundColor: "orange" } }}
          name="Filter"
          component={FilterScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
