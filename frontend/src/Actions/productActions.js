import axios from "axios";
import productConstants from "../Constants/productConstants";

export const getProductList = () => async (dispatch) => {
  try {
    dispatch({ type: productConstants.GET_PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/api/products");
    dispatch({ type: productConstants.GET_PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: productConstants.GET_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProduct = (id) => async(dispatch) => {
  try{
    dispatch({type:productConstants.GET_PRODUCT_REQUEST})
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch({type:productConstants.GET_PRODUCT_SUCCESS,payload:data})
  }catch(error){
      dispatch({type:productConstants.GET_PRODUCT_FAIL,payload:
        error.response&&error.response.data.message?
        error.response.data.message:
        error.message
      })
  }
}


