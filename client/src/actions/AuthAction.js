import * as AuthApi from "../api/AuthRequests"


//Login Action
export const logIn = (formData) => async(dispatch) => {

  dispatch({type: "AUTH_START"})
  try {
    const { data } = await AuthApi.logIn(formData)
    dispatch({type: "AUTH_SUCCESS", data: data})
  } catch (error) {
    console.log(error);
    dispatch({type: "AUTH_FAIL"}) 
  }
}


//SignUp Action
export const signUp = (formData) => async(dispatch) => {

  dispatch({type: "AUTH_START"})
  try {
    const { data } = await AuthApi.signUp(formData)
    dispatch({type: "AUTH_SUCCESS", data: data})
  } catch (error) {
    console.log(error);
    dispatch({type: "AUTH_FAIL"})
  }
}

//Log Out
export const logOut = () => async(dispatch) => {
  dispatch({type: "LOG_OUT"})
}

