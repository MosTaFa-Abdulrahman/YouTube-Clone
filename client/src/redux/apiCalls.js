import { publicRequest } from "../requestMethod";
import { loginFaulire, loginStart, loginSuccess, logOut } from "./userSlice";

// Login
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch {
    dispatch(loginFaulire());
  }
};

// LogOut
export const logOutt = async (dispatch) => {
  try {
    dispatch(logOut());
  } catch (error) {
    console.log(error.message);
  }
};
