import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "../../utils/constants";

const initialState = {
  user: null,
  cart: [],
  favourites: [],
  viewed: [],
  filters: {},
  isLoading: false,
  showForm: false,
  formType: "login",
  message: "",
  productsAmountOnPage: 8,
  productsQuantityOnPage: 8, // вкл
  currentSlug: "",
};

export const createUser = createAsyncThunk("user/createUser", async (data, thunkApi) => {
  try {
    const res = await axios.post(`${BASE_URL}/users/signup`, data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const loginUser = createAsyncThunk("user/loginUser", async (data, thunkApi) => {
  try {
    const res = await axios.post(`${BASE_URL}/users/login`, data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateUser = createAsyncThunk("user/updateUser", async (data, thunkApi) => {
  try {
    const res = await axios.patch(`${BASE_URL}/users/${data.id}`, data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      let newCart = [...state.cart];
      const found = newCart.find((prod) => prod.book.id === action.payload.book.id);

      if (found) {
        newCart = newCart.map((prod) => {
          return prod.book.id === action.payload.book.id
            ? { ...prod, quantity: !action.payload.quantity ? prod.quantity + 1 : action.payload.quantity }
            : prod;
        });
      } else {
        newCart.push({ ...action.payload, quantity: 1 });
      }
      state.cart = newCart;
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.book.id !== action.payload);
    },
    addToFavourites: (state, action) => {
      let newFavourites = [...state.favourites];
      const found = state.favourites.find((book) => book.id === action.payload.id);
      if (!found) {
        newFavourites.unshift(action.payload);
      } else {
        newFavourites = newFavourites.filter((item) => item.id !== action.payload.id);
      }
      state.favourites = newFavourites;
    },
    toggleForm: (state, action) => {
      state.showForm = action.payload;
    },
    toggleFormType: (state, action) => {
      state.formType = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    removeCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    setProductsAmountOnPage: (state, action) => {
      state.productsAmountOnPage = action.payload;
    },
    setProductsQuantityOnPage: (state, action) => {
      state.productsQuantityOnPage = action.payload;
    },
    getViewedProducts: (state, action) => {
      const isFound = state.viewed.find((elem) => elem.id === action.payload.id);

      if (!isFound) {
        state.viewed.unshift(action.payload);
      } else {
        state.viewed = state.viewed.filter((item) => item.id !== action.payload.id);
        state.viewed.unshift(action.payload);
      }
    },
    getFilters: (state, action) => {
      state.filters = action.payload;
    },
    setCurrentSlug: (state, action) => {
      state.currentSlug = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      if (action.payload === "Такой пользователь уже есть") {
        state.message = action.payload;
      } else {
        state.message = action.payload;
      }
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload === "Неверное имя пользователя или пароль") {
        state.message = action.payload;
      } else if (typeof action.payload === "object") {
        state.user = action.payload;
        state.message = "";
      }
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  getViewedProducts,
  getFilters,
  addToFavourites,
  setProductsAmountOnPage,
  setProductsQuantityOnPage,
  setCurrentSlug,
  toggleForm,
  removeCurrentUser,
  toggleFormType,
  setMessage,
} = userSlice.actions;

export const selectCart = (state) => state.user.cart;
export const selectFavourites = (state) => state.user.favourites;
export const selectForm = (state) => state.user.showForm;
export const selectFormType = (state) => state.user.formType;
export const selectUser = (state) => state.user.user;
export const selectMessage = (state) => state.user.message;
export const selectProductsAmountOnPage = (state) => state.user.productsAmountOnPage;
export const selectProductsQuantityOnPage = (state) => state.user.productsQuantityOnPage;
export const selectCurrentSlug = (state) => state.user.currentSlug;
export const selectViewedProducts = (state) => state.user.viewed;
export const selectFilters = (state) => state.user.filters;

export default userSlice.reducer;

// 2 вариант:
// const newCart = [...state.cart];
// const found = newCart.find((prod) => prod.book.id === action.payload.id);

// if (found) {
//   newCart.map((prod) => {
//     return prod.book.id === action.payload.id ? { ...prod, quantity: prod.quantity++ || action.payload.quantity } : prod;
//   });
// } else {
//   newCart.push({ book: action.payload, quantity: 1 });
// }

// 3 вариант:
// if (!state.cart.length) {
//   state.cart.push({ book: action.payload, quantity: 1 });
// } else {
//   const found = state.cart.find((prod) => prod.book.id === action.payload.id);

//   found
//     ? state.cart.map((prod) => {
//         return prod.book.id === action.payload.id ? { ...prod, quantity: prod.quantity++ } : prod;
//       })
//     : state.cart.push({ book: action.payload, quantity: 1 });
// }

// addToCart: (state, action) => {
//   console.log(action.payload);
//   const newCart = [...state.cart];
//   const found = newCart.find((prod) => prod.book.id === action.payload.id);
//   if (found) {
//     newCart.forEach((prod) => {
//       return prod.book.id === action.payload.id ? { ...prod, quantity: prod.quantity++ || action.payload.quantity } : prod;
//     });
//   } else {
//     newCart.push({ book: action.payload, quantity: 1 });
//   }
//   state.cart = newCart;
// },
