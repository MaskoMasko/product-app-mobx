import { makeAutoObservable, observable, action, flow, autorun } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLayoutEffect } from "react/cjs/react.production.min";

//getteri, stateTree i primitives

const state = observable({
  dataFetched: [],
  chosenProduct: undefined,
  get chosenProductDostupneVelicine() {
    if (!state.chosenProduct) return undefined;
    const splitaneVelicine = state.chosenProduct.dostupneVelicine.split(", ");
    return splitaneVelicine;
    // chosenProductDostupneVelicine je njegov return - nije normalan
  },
  cart: [],
  itemsPerPageArray: [],
  //---------------------
  itemsPerPage: 20,
  counter: 0,
  loading: false,
  zbroj: "0",
  //---------------------
  pojedinacneVelicine: [],
  odabranaVelicina: undefined,
  //---------------------
  filteredItems: [],
  value: "",
});

// const fetchingData = flow(function* fetchingData(url) {
//   const results = yield fetch(url);
//   const resultsToJson = yield results.json();
//   console.log(resultsToJson);
// });

const selectedProduct = action(function selectedProduct(product) {
  state.chosenProduct = product;
});

const addItemToCart = action((product) => {
  for (let i = 0; i < state.cart.length; i++) {
    if (state.cart[i].naslov == product.naslov) {
      return [...state.cart];
    }
  }
  return state.cart.push(product);
});

const racun = action(() => {
  let text = 0;
  for (let i = 0; i < store.state.cart.length; i++) {
    const splitano = store.state.cart[i].cijenaUKN.split(".");
    const parsano = parseInt(splitano[0]);
    text += parsano;
  }
  store.state.zbroj = text;
  return store.state.zbroj;
});

const removeItemFromCart = action(function removeItemFromCart(id) {
  state.cart.splice(id, 1);
});

//CA SE DESAVA
const filterFunciton = action((value, filterMethod) => {
  state.dataFetched.filter((item) => {
    if (item[filterMethod].startsWith(value)) {
      //DELA
      state.filteredItems.push(item[filterMethod]);
    }
  });
});

const fetchingData = flow(function* fetchingData(url) {
  state.loading = true;
  const result = yield fetch(url);
  const things = yield result.json();
  state.loading = false;
  const thingsWithSize = things.map((e) => {
    state.odabranaVelicina = e.dostupneVelicine[0];
    e.size = state.odabranaVelicina;
    return e;
  });
  state.dataFetched = thingsWithSize;
  state.itemsPerPageArray = state.dataFetched.splice(
    state.counter,
    state.itemsPerPage
  );
});

export const store = {
  state,
  selectedProduct,
  addItemToCart,
  removeItemFromCart,
  // filterItemsByName,
  // filterItemsByNum,
  filterFunciton,
  fetchingData,
  racun,
};
