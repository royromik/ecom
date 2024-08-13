import productConstants from "../Constants/productConstants"

export const productListReducer = (state={products:[]},action) => {
    switch (action.type) {
        case productConstants.GET_PRODUCT_LIST_REQUEST : 
            return {loading: true, products:[]}
        case productConstants.GET_PRODUCT_LIST_SUCCESS:
            return {loading: false , products: action.payload}
        case productConstants.GET_PRODUCT_LIST_FAIL  :
            return {loading: false, error: action.payload }
        default:
            return state
    }
}


export const productReducer = (state={product:{}}, action)=>{
    switch(action.type){
        case productConstants.GET_PRODUCT_REQUEST:
            return {loading:true,product:{}}
        case productConstants.GET_PRODUCT_LIST_SUCCESS:
            return {loading:false,product:action.payload}
        case productConstants.GET_PRODUCT_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}