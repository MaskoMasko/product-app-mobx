import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { CustBtn } from "../components/CustBtn";
import { store } from "../store/productStore";
import { observer } from "mobx-react";

//then u go in
export const MainProductScreen = observer(({ navigation }) => {
  const [showOptions, setShowOptions] = useState(false);
  const url = "http://mockapi.ddns.net/APIHandler";

  useEffect(() => {
    store.fetchingData(url);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <CustBtn
        title="OPTIONS"
        path="Options"
        onPress={() => setShowOptions(true)}
      ></CustBtn>
      <Modal visible={showOptions}>
        <CustBtn
          title="FILTER"
          path="Filter"
          onPress={() => {
            setShowOptions(false);
            navigation.navigate("Filter");
          }}
        ></CustBtn>
        <CustBtn
          title="CART"
          path="Cart"
          onPress={() => {
            setShowOptions(false);
            navigation.navigate("Cart");
          }}
        ></CustBtn>
      </Modal>
      <ScrollView>
        {store.state.dataFetched.map((e) => {
          return <Text>{e.naslov}</Text>;
        })
        // return (
        // <TouchableOpacity
        //   onPress={() => {
        //     store.selectedProduct(e.name);
        //     navigation.navigate("ProductDetails");
        //   }}
        //   key={i}
        //   style={{
        //     width: 150,
        //     height: 150,
        //     backgroundColor: "red",
        //     margin: 10,
        //     alignSelf: "center",
        //   }}
        // >
        // </TouchableOpacity>
        // );
        }
      </ScrollView>
    </View>
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
