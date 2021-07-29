import { observer } from "mobx-react";
import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export const CustBtn = observer(({ title, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={styles.buttons}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>{title}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  buttons: {
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 10,
    margin: 10,
  },
});
