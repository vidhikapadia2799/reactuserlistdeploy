import { ActionTypes } from "../constants/action-types";

export const listUsers = (users) => {
  return {
    type: ActionTypes.LIST_USERS,
    payload: users,
  };
};
