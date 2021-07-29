import { makeAutoObservable, observable, action, flow, autorun } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

const state = observable({
  dataFetched: [
    { num: "12", name: "da" },
    { num: "22", name: "ne" },
    { num: "32", name: "mozda" },
    { num: "42", name: "daaaa" },
    { num: "52", name: "zgrada" },
  ],
  chosenProduct: undefined,
  cart: [],
  filteredItemsByName: [],
  filteredItemsByNum: [],
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

const filterItemsByName = action((value) => {
  state.dataFetched.filter((item) => {
    if (item.name.startsWith(value)) {
      state.filteredItemsByName.push(item.name);
      const unique = Array.from(new Set([...state.filteredItemsByName]));
      state.filteredItemsByName = unique;
    }
  });
});

const filterItemsByNum = action((value) => {
  state.dataFetched.filter((item) => {
    if (item.num.startsWith(value)) {
      state.filteredItemsByNum.push(item.num);
      const unique = Array.from(new Set([...state.filteredItemsByNum]));
      state.filteredItemsByNum = unique;
    }
  });
});

export const store = {
  state,
  selectedProduct,
  addItemToCart,
  removeItemFromCart,
  filterItemsByName,
  filterItemsByNum,
};
