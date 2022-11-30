import { combineReducers } from "redux";

import authReducer from "./auth";
import loadingReducer from "./loading";
import productReducer from "./product";

const rootReducer = combineReducers({
    auth: authReducer,
    loading: loadingReducer,
    product: productReducer,
});

export default rootReducer;
