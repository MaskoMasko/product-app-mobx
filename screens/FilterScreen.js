import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  CheckBox,
  TouchableOpacity,
  Button,
} from "react-native";
import { observer } from "mobx-react";
import { store } from "../store/productStore";
import { CustBtn } from "../components/CustBtn";
import { action } from "mobx";

//filtering options
export const FilterScreen = observer(({ navigation }) => {
  return (
    <View>
      <Text>Filter Options</Text>
      <CustBtn
        title="FILTER BY NASLOV"
        onPress={() => store.filterFunciton(store.state.value, "naslov")}
      ></CustBtn>
      <CustBtn
        title="FILTER BY CIJENA"
        onPress={() => store.filterFunciton(store.state.value, "cijenaUKN")}
      ></CustBtn>
      <TextInput
        placeholder="SEARCH BY NAME"
        // value={store.state.value}
        value={store.state.value}
        onChangeText={action((e) => (store.state.value = e))}
      ></TextInput>
    </View>
  );
});
