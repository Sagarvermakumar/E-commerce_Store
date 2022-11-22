
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {productReducer} from "./reducers/productReducer"


const reducer = combineReducers({
   products : productReducer
});

let initialState = {};

const middleWare = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;



    // "backend": "nodemon Backend/server.js",
    // "frontend": "cd frontend && npm start",
    // "dev": "concurrently \"npm run frontend \" \"npm run backend \" "