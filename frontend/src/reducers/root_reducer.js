// src/reducers/root_reducer.js

import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from './errors_reducer';
import generatedRestaurant from './generated_reducer';
import historyRestaurant from "./history_reducer";
import categories from './category_reducer';
import ui from "./ui_reducer";
import join from "./join_reducer";

const RootReducer = combineReducers({
  session,
  errors,
  generatedRestaurant,
  historyRestaurant,
  categories,
  ui,
  join
});

export default RootReducer;
