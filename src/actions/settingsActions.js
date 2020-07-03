import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTERATION,
} from "./types";

export const setDisableBalanceOnAdd = () => {
  //GET SETTTINGS FROM LOCALSTORAGE
  const settings = JSON.parse(localStorage.getItem("settings"));

  //TOGGLE CHECKED AND UNCHECKED
  settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;

  //SET BACK TO LOCALSTORAGE
  localStorage.setItem("settings", JSON.stringify(settings));

  return {
    type: DISABLE_BALANCE_ON_ADD,
    payload: settings.disableBalanceOnAdd,
  };
};
export const setDisableBalanceOnEdit = () => {
  const settings = JSON.parse(localStorage.getItem("settings"));

  //TOGGLE CHECKED AND UNCHECKED
  settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;

  //SET BACK TO LOCALSTORAGE
  localStorage.setItem("settings", JSON.stringify(settings));
  return {
    type: DISABLE_BALANCE_ON_EDIT,
    payload: settings.disableBalanceOnEdit,
  };
};
export const setAllowRegisteration = () => {
  const settings = JSON.parse(localStorage.getItem("settings"));

  //TOGGLE CHECKED AND UNCHECKED
  settings.allowRegisteration = !settings.allowRegisteration;

  //SET BACK TO LOCALSTORAGE
  localStorage.setItem("settings", JSON.stringify(settings));
  return {
    type: ALLOW_REGISTERATION,
    payload: settings.allowRegisteration,
  };
};
