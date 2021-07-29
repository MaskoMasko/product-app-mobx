import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { observer } from "mobx-react";
import { store } from "../store/productStore";

//filtering options
export const FilterScreen = observer(() => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value == "") {
      store.state.filteredItems = [];
      return;
    }
    store.filterItems(value);
  }, [value]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        placeholder="Enter Value"
        value={value}
        onChangeText={(e) => setValue(e)}
      ></TextInput>
      <ScrollView>
        {store.state.filteredItems.map((e, i) => {
          return <Text key={i}>{e}</Text>;
        })}
      </ScrollView>
    </View>
  );
});
