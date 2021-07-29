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
          options={{ title: "Welcome To Product App" }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="ProductList"
          component={MainProductScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailScreen}
        ></Stack.Screen>
        <Stack.Screen name="Cart" component={CartScreen}></Stack.Screen>
        <Stack.Screen name="Filter" component={FilterScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
