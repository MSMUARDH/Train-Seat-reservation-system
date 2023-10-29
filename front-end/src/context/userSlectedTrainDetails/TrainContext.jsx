// TrainContext.js
import React, { createContext, useReducer, useContext } from "react";

// Initial state
const initialState = {
  trainId: "",
  trainName: "",
  trainType: "",
  route: "",
  departureTime: "",
  station: "",
};

// Reducer function
const trainReducer = (state, action) => {
  switch (action.type) {
    case "SET_TRAIN_SELECTION":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// Create context
const TrainContext = createContext();

// Context provider
const TrainProvider = ({ children }) => {
  const [trainState, dispatch] = useReducer(trainReducer, initialState);

  return (
    <TrainContext.Provider value={{ trainState, dispatch }}>
      {children}
    </TrainContext.Provider>
  );
};

export { TrainProvider, TrainContext };
