// import { makeAutoObservable, observable, action, flow, autorun } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { autorun } from "mobx";
import {
  types,
  flow,
  getSnapshot,
  onSnapshot,
  applySnapshot,
} from "mobx-state-tree";
import { State } from "react-native-gesture-handler";

const ProductModel = types
  .model("Product", {
    //TU MI BACA ERROR DA JE ID null/undefined
    //OMGAJGAD....................................
    id: types.identifierNumber,
    naslov: "",
    dostupneVelicine: types.string,
    cijenaUKN: types.string,
    slika1: types.maybe(types.string),

    odabranaVelicina: types.maybe(types.string),
  })
  .views((self) => {
    return {
      get dostupneVelicineList() {
        return self.dostupneVelicine.split(", ");
      },

      get cijenaNumber() {
        return parseFloat(self.cijenaUKN);
      },

      get imageSource() {
        const urlNaslov = self.naslov.replace(/\//g, "").replace(/\’/g, "");
        return { uri: `http://mockapi.ddns.net/images/YEE/${urlNaslov}/1.png` };
      },
    };
  });

const Store = types
  .model("Store", {
    productList: types.array(ProductModel),
    selectedProduct: types.safeReference(ProductModel),
    cartList: types.array(types.safeReference(ProductModel)),
    zbroj: types.optional(types.number, 0),
    coutner: types.optional(types.number, 0),
    itemsPerPage: types.optional(types.number, 20),
    itemsPerPageList: types.array(ProductModel),

    numItemsPerPage: 20,
    currentPage: 0,
  })
  .actions((self) => {
    return {
      set(data) {
        for (const key in data) {
          self[key] = data[key];
        }
      },
    };
  })
  .views((self) => {
    return {
      get productOffset() {
        return self.currentPage * self.numItemsPerPage;
      },
    };
  })
  .views((self) => {
    return {
      get nextPage() {
        return self.currentPage + 1;
      },

      get currentPageItems() {
        return self.productList.slice(
          self.productOffset,
          self.productOffset + self.numItemsPerPage
        );
      },
    };
  })
  .actions((self) => {
    return {
      goToNextPage() {
        self.currentPage += 1;
      },

      goToPreviousPage() {
        self.currentPage -= 1;
      },
    };
  })
  .actions((self) => {
    return {
      fetchData: flow(function* fetchData(url) {
        const results = yield fetch(url);
        const productListData = yield results.json();
        self.productList = productListData;
      }),
      setSelectedProduct(productId) {
        self.selectedProduct = productId;
      },
      setOdabranaVelicina(productId, velicina) {
        self.productList[productId].odabranaVelicina = velicina;
      },
      addSelectedProductToCartList(productId) {
        self.cartList.push(self.productList[productId]);
      },
      removeProductFromCartList(productId) {
        self.cartList.splice(productId, 1);
      },
      calculateMONEY() {
        self.zbroj = 0;
        for (let i = 0; i < self.cartList.length; i++) {
          const samoBroj = self.cartList[i].cijenaUKN.split(".")[0];
          self.zbroj += parseInt(samoBroj);
        }
      },
      // nextPage() {
      //   self.counter += 20;
      // },
      getData: flow(function* () {
        try {
          const jsonValue = yield AsyncStorage.getItem("cart list");
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
          // error reading value
          console.log("Error: ", e);
        }
      }),
      onAppStart: flow(function* () {
        // 1. Dohvati iz AsyncStorea podatke, i "applySnaphot" na model
        try {
          const rez = yield self.getData();
          //rez vraca sve stvari iz selfa (prductList i cartList)
          //self su arrayi i selectedProduct, a apply snapshot hi update-a sa dobivenin LISTA PUNIM ITEMIMA od getData funkcije
          applySnapshot(self, rez);
        } catch (e) {
          console.log("Error While Reading Data...");
          AsyncStorage.clear();
        }
        // //autorun run-a kada se u func autorun observeble stvar promjeni
        // //slicno kao useEffect
        // autorun(function persistCartList() {
        //   // self.storeData();
        //   AsyncStorage.setItem(
        //     "favorite character list",
        //   // getSnapshot returna snapshot representing current state of the model ca znaci da returna model s current stvarima u sebi dosta logicno
        //     JSON.stringify(getSnapshot(self))
        //   );
        // });

        //TAKO ILI OVAKO
        //onSnapshot uzima prvi arg Model(ca je self), a drugi callback func i on creates a listener that fires whenever a new snapshot is available (but only one per MobX transaction).
        //pretpostavljan da getSnapshot i applySnapshot returnaju novi snapshot
        onSnapshot(self, () => {
          const { productList, cartList } = self;

          AsyncStorage.setItem(
            "cart list",
            JSON.stringify({
              productList: getSnapshot(productList),
              cartList: getSnapshot(cartList),
            })
          );
        });
      }),
    };
  });

//getSnapshot - returna snapshot i current state-ove u modelu
//applySnapshot - (returna snapshot), prvi arg je koji model bimo stili promjeniti,a drugi je s cim bimo ga stili zamjeniti
//onSnapshot - to je kao snapshot listener, prvi arg model, drugi cb
export const productStore = Store.create({
  productList: [],
  cartList: [],
  itemsPerPageList: [],
});

productStore.onAppStart();

//getteri, stateTree i primitives

// const state = observable({
//   dataFetched: [],
//   chosenProduct: undefined,
//   get chosenProductDostupneVelicine() {
//     if (!state.chosenProduct) return undefined;
//     const splitaneVelicine = state.chosenProduct.dostupneVelicine.split(", ");
//     return splitaneVelicine;
//     // chosenProductDostupneVelicine je njegov return - nije normalan
//   },
//   cart: [],
//   itemsPerPageArray: [],
//   //---------------------
//   itemsPerPage: 20,
//   counter: 0,
//   loading: false,
//   zbroj: "0",
//   //---------------------
//   pojedinacneVelicine: [],
//   odabranaVelicina: undefined,
//   //---------------------
//   filteredItems: [],
//   value: "",
// });

// // const fetchingData = flow(function* fetchingData(url) {
// //   const results = yield fetch(url);
// //   const resultsToJson = yield results.json();
// //   console.log(resultsToJson);
// // });

// const selectedProduct = action(function selectedProduct(product) {
//   state.chosenProduct = product;
// });

// const addItemToCart = action((product) => {
//   for (let i = 0; i < state.cart.length; i++) {
//     if (state.cart[i].naslov == product.naslov) {
//       return [...state.cart];
//     }
//   }
//   return state.cart.push(product);
// });

// const racun = action(() => {
//   let text = 0;
//   for (let i = 0; i < store.state.cart.length; i++) {
//     const splitano = store.state.cart[i].cijenaUKN.split(".");
//     const parsano = parseInt(splitano[0]);
//     text += parsano;
//   }
//   store.state.zbroj = text;
//   return store.state.zbroj;
// });

// const removeItemFromCart = action(function removeItemFromCart(id) {
//   state.cart.splice(id, 1);
// });

// //CA SE DESAVA
// const filterFunciton = action((value, filterMethod) => {
//   state.dataFetched.filter((item) => {
//     if (item[filterMethod].startsWith(value)) {
//       //DELA
//       if (filterMethod == "cijenaUKN") {
//         state.filteredItems.push({
//           naslov: item["naslov"],
//           cijenaUKN: item.cijenaUKN,
//           dostupneVelicine: item.dostupneVelicine,
//         });
//       } else {
//         state.filteredItems.push({
//           naslov: item[filterMethod],
//           cijenaUKN: item.cijenaUKN,
//           dostupneVelicine: item.dostupneVelicine,
//         });
//       }
//     }
//   });
// });

// const fetchingData = flow(function* fetchingData(url) {
//   state.loading = true;
//   const result = yield fetch(url);
//   const things = yield result.json();
//   state.loading = false;
//   const thingsWithSize = things.map((e) => {
//     state.odabranaVelicina = e.dostupneVelicine[0];
//     e.size = state.odabranaVelicina;
//     return e;
//   });
//   state.dataFetched = thingsWithSize;
//   state.itemsPerPageArray = state.dataFetched.splice(
//     state.counter,
//     state.itemsPerPage
//   );
// });

// export const store = {
//   state,
//   selectedProduct,
//   addItemToCart,
//   removeItemFromCart,
//   // filterItemsByName,
//   // filterItemsByNum,
//   filterFunciton,
//   fetchingData,
//   racun,
// };
