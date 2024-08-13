import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, productReducer } from "./Reducers/productReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  updateUserProfileReducer,
} from "./Reducers/userReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  updateProfile: updateUserProfileReducer,
});

const userInfoFromLocalstorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = { userLogin: { user: userInfoFromLocalstorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
