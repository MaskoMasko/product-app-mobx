import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, CheckBox } from "react-native";
import { observer } from "mobx-react";
import { store } from "../store/productStore";

//filtering options
export const FilterScreen = observer(() => {
  const [value, setValue] = useState("");
  const [selection, setSelection] = useState(false);

  useEffect(() => {
    if (selection) {
      if (value == "") {
        store.state.filteredItemsByName = [];
        return;
      }
      store.filterItemsByName(value);
    }
    if (value == "") {
      store.state.filteredItemsByNum = [];
      return;
    }
    store.filterItemsByNum(value);
  }, [value]);

  return (
    <View
      style={{
        flex: 1,
        margin: 50,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CheckBox value={selection} onValueChange={setSelection} />
      <Text>Name</Text>
      {selection ? (
        <View>
          <TextInput
            placeholder="Enter name"
            value={value}
            onChangeText={(e) => setValue(e)}
          ></TextInput>
          <ScrollView>
            {store.state.filteredItemsByName.map((e, i) => {
              return <Text key={i}>{e}</Text>;
            })}
          </ScrollView>
        </View>
      ) : (
        <View>
          <TextInput
            placeholder="Enter num"
            value={value}
            onChangeText={(e) => setValue(e)}
          ></TextInput>
          <ScrollView>
            {store.state.filteredItemsByNum.map((e, i) => {
              return <Text key={i}>{e}</Text>;
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
});
