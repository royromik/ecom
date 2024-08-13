import userConstants from "../Constants/userConstants";

export const userLoginReducer = (state={},action) =>{
     switch(action.type){
        case userConstants.USER_LOGIN_REQUEST:
            return {loading: true}
        case userConstants.USER_LOGIN_SUCCESS:
            return {loading: false, user:action.payload}
        case userConstants.USER_LOGIN_FAIL :
            return {loading: false, error: action.payload, }
        case userConstants.USER_LOGOUT :
            return {}
        default :
           return state;
     }
}

export const userRegisterReducer = (state={},action) => {
    switch(action.type){
        case userConstants.USER_REGISTER_REQUEST:
            return {loading:true};
        case userConstants.USER_REGISTER_SUCCESS:
            return {loading:false,user:action.payload}
        case userConstants.USER_REGISTER_FAIL:
            return {loading:false,error:action.payload}
        case userConstants.USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userProfileReducer = (state={},action)=>{
    switch(action.type){
        case userConstants.USER_PROFILE_REQUEST : 
            return {loading:true}
        case userConstants.USER_PROFILE_SUCCESS:
            return {loading:false,userInfo: action.payload}
        case userConstants.USER_PROFILE_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const updateUserProfileReducer = (state={},action)=>{
    switch(action.type){
        case userConstants.USER_UPDATE_PROFILE_REQUEST:
            return {loading:true,success:false}
        case userConstants.USER_UPDATE_PROFILE_SUCCESS:
            return {loading:false,success:true,updatedUser:action.payload}
        case userConstants.USER_UPDATE_PROFILE_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state;
    }
}