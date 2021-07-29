import { makeAutoObservable, observable, action, flow, autorun } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

const state = observable({
  dataFetched: ["1", "2", "3", "4", "5"],
  chosenProduct: undefined,
  cart: [],
  filteredItems: [],
});

// const fetchingData = flow(function* fetchingData(url) {
//   const results = yield fetch(url);
//   const resultsToJson = yield results.json();
//   console.log(resultsToJson);
// });

const selectedProduct = action((product) => {
  state.chosenProduct = product;
});

const addItemToCart = action((product) => {
  state.cart.push(product);
});

const removeItemFromCart = action((id) => {
  state.cart.splice(id, 1);
});

const filterItems = action((value) => {
  for (let i = 0; i < state.dataFetched.length; i++) {
    if (state.dataFetched[i].startsWith(value)) {
      state.filteredItems.push(state.dataFetched[i]);
    }
  }
});

export const store = {
  state,
  selectedProduct,
  addItemToCart,
  removeItemFromCart,
  filterItems,
};
