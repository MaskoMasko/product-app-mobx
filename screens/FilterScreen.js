import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { observer } from "mobx-react";
import { store } from "../store/productStore";
import { CustBtn } from "../components/CustBtn";
import { action } from "mobx";

//filtering options
export const FilterScreen = observer(({ navigation }) => {
  return (
    <View style={{ backgroundColor: "#fff6cc", height: "100%" }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginVertical: 15,
          margin: 10,
        }}
      >
        Filter Options
      </Text>
      <CustBtn
        title="FILTER BY NASLOV"
        onPress={() => {
          if (store.state.value == "") {
            return Alert.alert("Enter Something!");
          }
          store.filterFunciton(store.state.value, "naslov");
        }}
      ></CustBtn>
      <CustBtn
        title="FILTER BY CIJENA"
        onPress={() => {
          if (store.state.value == "") {
            return Alert.alert("Enter Something!");
          }
          store.filterFunciton(store.state.value, "cijenaUKN");
        }}
      ></CustBtn>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: "black",
          marginHorizontal: 10,
          paddingHorizontal: 20,
          padding: 10,
          marginVertical: 20,
          borderRadius: 5,
          backgroundColor: "#FFFDC3",
        }}
        placeholder="SEARCH BY NAME"
        // value={store.state.value}
        value={store.state.value}
        onChangeText={action((e) => (store.state.value = e))}
      ></TextInput>
      <ScrollView style={{ marginBottom: 30 }}>
        {store.state.filteredItems.map((product, i) => {
          const { naslov, cijenaUKN, dostupneVelicine } = product;
          const urlNaslov = naslov.replace(/\//g, "").replace(/\’/g, "");
          return (
            <View
              key={i}
              style={{
                borderColor: "black",
                borderWidth: 1,
                borderBottomWidth: 0,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{
                    uri: `http://mockapi.ddns.net/YEE/${urlNaslov}/1.png`,
                  }}
                  style={[
                    styles.altImage,
                    { width: 100, height: 100, margin: 10, marginBottom: 0 },
                  ]}
                />
                <View>
                  <Text style={[styles.manjiText, { marginTop: 10 }]}>
                    {naslov}
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "orange",
                      width: 150,
                      borderRadius: 10,
                      margin: 10,
                    }}
                    activeOpacity={0.5}
                    onPress={action(() => {
                      store.state.pojedinacneVelicine = [];
                      store.state.chosenProduct = product;
                      navigation.navigate("ProductDetails");
                    })}
                  >
                    <Text
                      style={{
                        color: "white",
                        padding: 10,
                        fontWeight: "bold",
                      }}
                    >
                      MORE DETAILS
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  altImage: {
    backgroundColor: "aliceblue",
    height: 350,
    width: "100%",
  },
});
