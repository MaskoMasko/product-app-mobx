import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { productStore } from "../store/productStore";

//then u go in
// export const MainProductScreen = observer(({ navigation }) => {
//   const [showOptions, setShowOptions] = useState(false);
//   const url = "http://mockapi.ddns.net/APIHandler";
//   const scrollRef = useRef();
//   const coutnerRef = useRef(0);

//   const onNextPress = action(() => {
//       y: 0,
//     scrollRef.current?.scrollTo({
//       animated: false,
//     });
//   });

//   useEffect(() => {
//     store.fetchingData(url);
//   }, [store.state.counter]);

//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         backgroundColor: "#fff6cc",
//       }}
//     >
//       <CustBtn
//         title="OPTIONS"
//         path="Options"
//         onPress={() => setShowOptions(true)}
//       ></CustBtn>
//       <Modal visible={showOptions} animationType="slide">
//         <View
//           style={{
//             height: "100%",
//             justifyContent: "space-between",
//             backgroundColor: "#fff6cc",
//           }}
//         >
//           <View>
//             <Text></Text>

//             <CustBtn
//               title="FILTER"
//               onPress={() => {
//                 setShowOptions(false);
//                 navigation.navigate("Filter");
//               }}
//             ></CustBtn>
//             <CustBtn
//               title="CART"
//               onPress={() => {
//                 setShowOptions(false);
//                 navigation.navigate("Cart");
//               }}
//             ></CustBtn>
//           </View>
//           <View>
//             <CustBtn
//               title="GO BACK"
//               onPress={() => {
//                 setShowOptions(false);
//               }}
//             ></CustBtn>
//             <Text></Text>
//           </View>
//         </View>
//       </Modal>
//       {store.state.loading ? (
//         <View
//           style={{
//             width: "100%",
//             height: "90%",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Text style={[styles.naslovText, { fontSize: 30 }]}>Loading...</Text>
//         </View>
//       ) : (
//         <ScrollView ref={scrollRef} style={{ backgroundColor: "#fff6cc" }}>
//           {store.state.itemsPerPageArray.map((product, idx) => {
//             const { naslov, cijenaUKN, dostupneVelicine, id } = product;
//             const urlNaslov = naslov.replace(/\//g, "").replace(/\’/g, "");
//             return (
//               <TouchableOpacity
//                 activeOpacity={0.5}
//                 style={[
//                   styles.itemPrePageProduct,
//                   { margin: 0, marginBottom: 20 },
//                 ]}
//                 key={idx}
//                 onPress={action(() => {
//                   store.state.pojedinacneVelicine = [];
//                   store.state.chosenProduct = product;
//                   navigation.navigate("ProductDetails");
//                 })}
//               >
//                 <View style={{ alignItems: "center" }}>
//                   <Image
//                     source={{
//                       uri: `http://mockapi.ddns.net/YEE/${urlNaslov}/1.png`,
//                     }}
//                     style={styles.altImage}
//                   />
//                   <Text style={styles.naslovText}>{naslov}</Text>
//                   <View style={styles.textUnderHeading}>
//                     <View style={styles.textPlacement}>
//                       <Text style={styles.THICCText}>CIjena:</Text>
//                       <Text style={styles.THICCText}>{cijenaUKN}</Text>
//                     </View>
//                     <View style={styles.textPlacement}>
//                       <Text style={styles.THICCText}>Dostupne Velicine:</Text>
//                       <View>
//                         <Text style={styles.THICCText}>{dostupneVelicine}</Text>
//                       </View>
//                       {/* <View style={styles.THICCText}>
//                         {dostupneVelicine.map((e, id) => {
//                           return <Text key={id}>{e}</Text>;
//                         })}
//                       </View> */}
//                     </View>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             );
//           })}
//           <View style={{ flexDirection: "row", alignSelf: "center" }}>
//             <TouchableOpacity
//               activeOpacity={0.5}
//               disabled={store.state.counter == 0}
//               onPress={action(() => {
//                 if (store.state.counter > 0 && coutnerRef.current > 0) {
//                   store.state.counter -= 20;
//                   coutnerRef.current -= 1;
//                   onNextPress();
//                 }
//               })}
//               style={
//                 store.state.counter == 0
//                   ? [
//                       styles.loginButton,
//                       {
//                         width: "30%",
//                         margin: 10,
//                         backgroundColor: "rgba(255, 162, 80, .7)",
//                       },
//                     ]
//                   : [styles.loginButton, { width: "30%", margin: 10 }]
//               }
//             >
//               <Text style={styles.loginButtonText}>PREV PAGE</Text>
//             </TouchableOpacity>
//             <View>
//               <Text
//                 style={[
//                   styles.loginButtonText,
//                   {
//                     marginHorizontal: 5,
//                     fontSize: 18,
//                     marginVertical: 10,
//                     padding: 5,
//                     paddingHorizontal: 15,
//                     textAlign: "center",
//                     backgroundColor: "#04080F",
//                     borderRadius: 10,
//                     color: "white",
//                   },
//                 ]}
//               >
//                 {coutnerRef.current}
//               </Text>
//             </View>
//             <TouchableOpacity
//               activeOpacity={0.5}
//               onPress={action(() => {
//                 store.state.counter += 20;
//                 coutnerRef.current += 1;
//                 onNextPress();
//               })}
//               style={[styles.loginButton, { width: "30%", margin: 10 }]}
//             >
//               <Text style={styles.loginButtonText}>NEXT PAGE</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       )}
//     </View>
//   );
// });

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
  loginButton: {
    padding: 10,
    backgroundColor: "#FFA250",
    borderRadius: 10,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  scrollView: { flex: 1, backgroundColor: "#fff6cc" },
});

const ProductListItem = observer(function ProductListItem({
  product,
  idx,
  navigation,
}) {
  const { naslov, dostupneVelicineList, id, cijenaUKN } = product;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.itemPrePageProduct, { margin: 0, marginBottom: 20 }]}
      key={idx}
      onPress={() => {
        productStore.setSelectedProduct(id);
        navigation.navigate("ProductDetails");
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Image source={product.imageSource} style={styles.altImage} />
        <Text style={styles.naslovText}>
          {idx}. {naslov}
        </Text>
        <View style={styles.textUnderHeading}>
          <View style={styles.textPlacement}>
            <Text style={styles.THICCText}>CIjena:</Text>
            <Text style={styles.THICCText}>{cijenaUKN}</Text>
          </View>
          <View style={styles.textPlacement}>
            <Text style={styles.THICCText}>Dostupne Velicine:</Text>
            <View style={[styles.THICCText, { flexDirection: "row" }]}>
              {dostupneVelicineList.map((e, id) => {
                return (
                  <Text style={styles.THICCText} key={id}>
                    {e}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export const MainProductScreen = observer(({ navigation }) => {
  const url = "http://mockapi.ddns.net/APIHandler";
  useEffect(() => {
    productStore.fetchData(url);
  }, []);
  const scrollRef = useRef();

  useEffect(() => {
    productStore.set({ currentPage: 0 });
  }, []);
  return (
    <FlatList
      ref={scrollRef}
      keyExtractor={(product) => product.id.toString()}
      style={styles.scrollView}
      data={productStore.currentPageItems}
      windowSize={5}
      renderItem={({ item: product, index: idx }) => {
        return (
          <ProductListItem
            product={product}
            idx={idx}
            navigation={navigation}
          ></ProductListItem>
        );
      }}
      ListFooterComponent={
        <View>
          <Button
            title="GO NEXT"
            onPress={() => {
              productStore.goToNextPage();
              scrollRef.current.scrollTo({ y: 0, animated: false });
            }}
          ></Button>
        </View>
      }
    />
  );
});
