import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { productStore, store } from "../store/productStore";
// import { observer } from "mobx-react";
import { action, runInAction } from "mobx";
import { CustBtn } from "../components/CustBtn";
import { observer } from "mobx-react-lite";

//Product details
// export const ProductDetailScreen = observer(({ navigation }) => {
//   const { naslov, cijenaUKN, id, size } = store.state.chosenProduct;
//   const dostupneVelicine = store.state.chosenProductDostupneVelicine;
//   const urlNaslov = naslov.replace(/\//g, "").replace(/\’/g, "");
//   const [kojaVelicina, setKojaVelicina] = React.useState(dostupneVelicine[0]);
//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "#fff6cc",
//       }}
//     >
//       <View style={styles.modalProductContainer}>
//         <View style={styles.productContainer}>
//           <View style={{ alignItems: "center" }}>
//             <Image
//               source={{ uri: `http://mockapi.ddns.net/YEE/${urlNaslov}/1.png` }}
//               style={styles.altImage}
//             />
//             <Text style={styles.naslovText}>{naslov}</Text>
//             <View style={styles.textUnderHeading}>
//               <View style={styles.textPlacement}>
//                 <Text style={styles.THICCText}>CIjena:</Text>
//                 <Text style={styles.THICCText}>{cijenaUKN}</Text>
//               </View>
//               <View style={styles.textPlacement}>
//                 <Text style={styles.THICCText}>Dostupne Velicine:</Text>
//                 <View style={{ flexDirection: "row" }}>
//                   {dostupneVelicine.map((pojedinacnaVelicina, i) => {
//                     return (
//                       <TouchableOpacity
//                         style={
//                           pojedinacnaVelicina == kojaVelicina
//                             ? {
//                                 padding: 5,
//                                 backgroundColor: "orange",
//                                 margin: 5,
//                                 width: 30,
//                               }
//                             : {
//                                 padding: 5,
//                                 backgroundColor: "black",
//                                 margin: 5,
//                                 width: 30,
//                               }
//                         }
//                         key={i}
//                         onPress={() => {
//                           runInAction(() => {
//                             store.state.chosenProduct.size = pojedinacnaVelicina;
//                           });
//                           setKojaVelicina(dostupneVelicine[i]);
//                         }}
//                         activeOpacity={0.5}
//                       >
//                         <Text style={{ color: "white", fontWeight: "bold" }}>
//                           {pojedinacnaVelicina}
//                         </Text>
//                       </TouchableOpacity>
//                     );
//                   })}
//                 </View>
//               </View>
//               <View style={styles.aboutText}>
//                 <Text style={styles.thiccText}>ABOUT PRODUCT</Text>
//                 <Text style={styles.tikText}>
//                   Lorem Ipsum is simply dummy text of the printing and
//                   typesetting industry. Lorem Ipsum has been the industry's
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>
//       <View style={{ flexDirection: "row", marginTop: -40, marginBottom: 50 }}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={{
//             padding: 10,
//             height: 45,
//             borderRadius: 10,
//             backgroundColor: "black",
//             marginTop: 10,
//           }}
//         >
//           <Text style={{ color: "white", fontWeight: "bold" }}>GO BACK</Text>
//         </TouchableOpacity>
//         <CustBtn
//           onPress={() => {
//             store.addItemToCart(store.state.chosenProduct);
//             navigation.navigate("Cart");
//           }}
//           title="ADD ITEM TO CART"
//         ></CustBtn>
//       </View>
//     </View>
//   );
// });

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

export const ProductDetailScreen = observer(({ navigation }) => {
  const { naslov, id, cijenaUKN, dostupneVelicineList } =
    productStore.selectedProduct;
  const urlNaslov = naslov.replace(/\//g, "").replace(/\’/g, "");
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
              source={productStore.selectedProduct.imageSource}
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
                  {dostupneVelicineList.map((pojedinacnaVelicina, i) => {
                    return (
                      <TouchableOpacity
                        key={i}
                        style={{
                          padding: 10,
                          backgroundColor: "red",
                          margin: 5,
                        }}
                        onPress={() => {
                          productStore.setOdabranaVelicina(
                            id,
                            pojedinacnaVelicina.replace(/ /g, "")
                          );
                        }}
                      >
                        <Text>{pojedinacnaVelicina.replace(/ /g, "")}</Text>
                      </TouchableOpacity>
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
      <View style={{ flexDirection: "row", marginTop: -40, marginBottom: 50 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            padding: 10,
            height: 45,
            borderRadius: 10,
            backgroundColor: "black",
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>GO BACK</Text>
        </TouchableOpacity>
        <CustBtn
          onPress={() => {
            productStore.addSelectedProductToCartList(
              productStore.selectedProduct.id
            );
            navigation.navigate("Cart");
          }}
          title="ADD ITEM TO CART"
        ></CustBtn>
      </View>
    </View>
  );
});
