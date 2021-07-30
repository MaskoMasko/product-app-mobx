import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { store } from "../store/productStore";
import { observer } from "mobx-react";

//Product details
export const ProductDetailScreen = observer(({ navigation }) => {
  const { naslov, cijenaUKN, dostupneVelicine, id } = store.state.chosenProduct;
  var urlNaslov = naslov.replace(/\//g, "").replace(/\’/g, "");

  var splitaneVelicine = dostupneVelicine.split(" ");

  splitaneVelicine.map((e, i) => {
    if (i % 2 == 0) {
      store.state.pojedinacneVelicine.push(e);
      store.state.odabranaVelicina = store.state.pojedinacneVelicine[0];
    }
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff6cc",
      }}
    >
      <View style={styles.modalProductContainer}>
        <View style={styles.productContainer}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={{ uri: `http://mockapi.ddns.net/YEE/${urlNaslov}/1.png` }}
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
                <View style={{ flexDirection: "row" }}>
                  {store.state.pojedinacneVelicine.map((e, i) => {
                    return (
                      <Button
                        title={e}
                        key={i}
                        onPress={() => {
                          store.state.odabranaVelicina =
                            store.state.pojedinacneVelicine[i];
                        }}
                      ></Button>
                    );
                  })}
                </View>
              </View>
              <View style={styles.aboutText}>
                <Text style={styles.thiccText}>ABOUT PRODUCT</Text>
                <Text style={styles.tikText}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Button
        title="Add Item To Cart"
        onPress={() => {
          store.addItemToCart(store.state.chosenProduct);
          navigation.navigate("Cart");
        }}
      ></Button>
      <Button title="Go Back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
});

const styles = StyleSheet.create({
  modalProductContainer: {
    backgroundColor: "#fff6cc",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  productContainer: {
    backgroundColor: "#ffc971",
    width: "100%",
    padding: 10,
    paddingBottom: 15,
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
