import axios from "axios";
import userConstants from "../Constants/userConstants";

export const userLoginAction = (userDetails) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post("api/users/login", userDetails, config);
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userConstants.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userLogout = () => async (dispatch) => {
  dispatch({ type: userConstants.USER_LOGOUT });
  localStorage.removeItem("userInfo");
};

export const userRegister =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: userConstants.USER_REGISTER_REQUEST });
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        "/api/users/register",
        { name, email, password },
        config
      );
      dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: userConstants.USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const userProfile = () => async (dispatch,getState) => {
  try {
    dispatch({ type: userConstants.USER_PROFILE_REQUEST });
    const {userLogin:{user}} = getState()
    const config = {headers:{
      Authorization : `Bearer ${user.token}`
    }}
    const { data } = await axios.get("/api/users/profile",config);
    dispatch({ type: userConstants.USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: userConstants.USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProfile = ({name,email,password}) => async(dispatch,getState)=>{
  try{
    dispatch({type:userConstants.USER_UPDATE_PROFILE_REQUEST});
    const {userLogin:{user}} = getState()
    const config = {headers:{
      Authorization : `Bearer ${user.token}`
    }}
    const {data} = await axios.put("/api/users/profile",{name,email,password},config)
    dispatch({type:userConstants.USER_UPDATE_PROFILE_SUCCESS,payload:data});
    dispatch({ type: userConstants.USER_PROFILE_SUCCESS, payload: data });
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: {...user,name:data.name,email:data.email} });
    const userInfoFromStorage = JSON.parse(localStorage.getItem("userInfo"));
    localStorage.setItem("userInfo",JSON.stringify({...userInfoFromStorage,name:data.name,email:data.email}));
  }catch(error){
    dispatch({type:userConstants.USER_UPDATE_PROFILE_FAIL,
      payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}
