import axios from "axios";

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_ADDRESS,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstant";

export const addToCart = (id, qty, size, color) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      _id: data.findProduct._id,
      realname: data.findProduct.realname,
      image: data.findProduct.image[0],
      cost: data.findProduct.cost,
      discount: data.findProduct.discount,
      // countInStock: data.countInStock,
      qty,
      size,
      color
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeCartItem = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethodAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_ADDRESS,
    payload: data,
  });

  localStorage.setItem("paymentAddress", JSON.stringify(data));
};
