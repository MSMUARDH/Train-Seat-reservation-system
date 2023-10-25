// TrainContext.js
import React, { createContext, useReducer, useContext } from "react";

// Initial state
const initialState = {
  trainId: "2222 test",
  trainName: "Bradly Express test",
  trainType: "express",
  route: "Badulla - Colombo Fort",
  departureTime: "2023-10-19T11:00:00.811Z",
  station: "Nawalapitiya",
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
