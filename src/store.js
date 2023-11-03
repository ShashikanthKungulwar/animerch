import { storeApiReducer } from "./redux/reducers/sotreApiReducer";
import { databaseReducer } from "./redux/reducers/databaseReducer";
const { configureStore } = require("@reduxjs/toolkit");



export const store=configureStore({
    reducer:{
        storeApiReducer,
        databaseReducer
    }
})