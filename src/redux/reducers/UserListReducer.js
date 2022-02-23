import { ActionTypes } from "../constants/action-types";

const initialState = {
  users: [
    {
      id: 0,
      first_name: "Vidhi",
      email: "v@gmail.com",
    },
  ],
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.LIST_USERS:
      return {
        ...state,
        users: payload,
      };

    default:
      return state;
  }
};

export default userReducer;
