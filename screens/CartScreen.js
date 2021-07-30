import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { store } from "../store/productStore";
import { observer } from "mobx-react";
import { CustBtn } from "../components/CustBtn";

//cart
export const CartScreen = observer(({ navigation }) => {
  var text = 0;

  for (let i = 0; i < store.state.cart.length; i++) {
    var splitano = store.state.cart[i].cijenaUKN.split(".");
    var parsano = parseInt(splitano[0]);
    text += parsano;
  }
  store.state.zbroj = text;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View
        style={{ backgroundColor: "#fff6cc", height: "100%", width: "100%" }}
      >
        <Text style={styles.mainText}>Your Cart:</Text>
        <ScrollView>
          {store.state.cart.map((item, idx) => {
            const { id, naslov, dostupneVelicine, cijenaUKN } = item;
            var urlNaslov = naslov.replace(/\//g, "").replace(/\’/g, "");

            return (
              <View
                key={id}
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
                    <Text style={styles.manjiText}>{dostupneVelicine}</Text>
                    <Text style={styles.manjiText}>{cijenaUKN}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "orange",
                    width: 150,
                    borderRadius: 10,
                    margin: 10,
                  }}
                  activeOpacity={0.5}
                  onPress={() => store.removeItemFromCart(idx)}
                >
                  <Text
                    style={{ color: "white", padding: 10, fontWeight: "bold" }}
                  >
                    REMOVE ITEM
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <Text
          style={[
            styles.mainText,
            {
              marginBottom: 20,
              padding: 10,
              marginTop: 0,
              borderTopColor: "black",
              borderTopWidth: 3,
            },
          ]}
        >
          Sve Ukupno: {store.state.zbroj} Kn
        </Text>
        <CustBtn
          title="GO BACK"
          onPress={() => navigation.navigate("Home")}
        ></CustBtn>
        <Text></Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  mainText: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
  },
  altImage: {
    backgroundColor: "aliceblue",
    height: 100,
    width: "100%",
  },
  manjiText: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 2,
  },
});
