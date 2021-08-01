import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import { CustBtn } from "../components/CustBtn";
import { store } from "../store/productStore";
import { observer } from "mobx-react";
import { autorun, action } from "mobx";

//then u go in
export const MainProductScreen = observer(({ navigation }) => {
  const [showOptions, setShowOptions] = useState(false);
  const url = "http://mockapi.ddns.net/APIHandler";
  const scrollRef = useRef();

  const onNextPress = action(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: false,
    });
  });

  useEffect(() => {
    store.fetchingData(url);
  }, [store.state.counter]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff6cc",
      }}
    >
      <CustBtn
        title="OPTIONS"
        path="Options"
        onPress={() => setShowOptions(true)}
      ></CustBtn>
      <Modal visible={showOptions} animationType="slide">
        <View
          style={{
            height: "100%",
            justifyContent: "space-between",
            backgroundColor: "#fff6cc",
          }}
        >
          <View>
            <Text></Text>

            <CustBtn
              title="FILTER"
              onPress={() => {
                setShowOptions(false);
                navigation.navigate("Filter");
              }}
            ></CustBtn>
            <CustBtn
              title="CART"
              onPress={() => {
                setShowOptions(false);
                navigation.navigate("Cart");
              }}
            ></CustBtn>
          </View>
          <View>
            <CustBtn
              title="GO BACK"
              onPress={() => {
                setShowOptions(false);
              }}
            ></CustBtn>
            <Text></Text>
          </View>
        </View>
      </Modal>
      {store.state.loading ? (
        <View
          style={{
            width: "100%",
            height: "90%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={[styles.naslovText, { fontSize: 30 }]}>Loading...</Text>
        </View>
      ) : (
        <ScrollView ref={scrollRef} style={{ backgroundColor: "#fff6cc" }}>
          {store.state.itemsPerPageArray.map((product, idx) => {
            const { naslov, cijenaUKN, dostupneVelicine, id } = product;
            const urlNaslov = naslov.replace(/\//g, "").replace(/\’/g, "");
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  styles.itemPrePageProduct,
                  { margin: 0, marginBottom: 20 },
                ]}
                key={idx}
                onPress={action(() => {
                  store.state.pojedinacneVelicine = [];
                  store.state.chosenProduct = product;
                  navigation.navigate("ProductDetails");
                })}
              >
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={{
                      uri: `http://mockapi.ddns.net/YEE/${urlNaslov}/1.png`,
                    }}
                    style={styles.altImage}
                  />
                  <Text style={styles.naslovText}>{naslov}</Text>
                  <View style={styles.textUnderHeading}>
                    <View style={styles.textPlacement}>
                      <Text style={styles.THICCText}>CIjena:</Text>
                      <Text style={styles.THICCText}>{cijenaUKN}</Text>
                    </View>
                    <View style={styles.textPlacement}>
                      <Text style={styles.THICCText}>Dostupne Velicine:</Text>
                      <View>
                        <Text style={styles.THICCText}>{dostupneVelicine}</Text>
                      </View>
                      {/* <View style={styles.THICCText}>
                        {dostupneVelicine.map((e, id) => {
                          return <Text key={id}>{e}</Text>;
                        })}
                      </View> */}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          <Button
            title="next"
            onPress={action(() => {
              store.state.counter += 20;
              onNextPress();
            })}
          ></Button>
        </ScrollView>
      )}
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
  itemPrePageProduct: {
    backgroundColor: "#ffc971",
    width: "94%",
    marginHorizontal: "3%",
    margin: 10,
    padding: 10,
    paddingBottom: 20,
    borderWidth: 3,
    borderColor: "black",
    shadowColor: "#470000",
    elevation: 7,
  },
  altImage: {
    backgroundColor: "aliceblue",
    height: 350,
    width: "100%",
  },
  naslovText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textUnderHeading: {
    backgroundColor: "#fbffb9",
    borderRadius: 10,
    paddingVertical: 15,
    width: "98%",
  },
  textPlacement: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "5%",
  },
  THICCText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  aboutText: {
    width: "90%",
    alignSelf: "center",
    paddingTop: 30,
  },
  thiccText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  tikText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
