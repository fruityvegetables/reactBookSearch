import {
    SIGNIN_USER,
    SIGNIN_USER_SUCCESS,
    SHOW_AUTH_LOADER,
    CLEAR_SIGNIN_ERROR,
    SIGNOUT_USER,
  } from 'constants/ActionTypes';
  
  export const userSignIn = (user) => {
    return {
      type: SIGNIN_USER,
      payload: user
    };
  };
  
  export const userSignInSuccess = (authUser) => {
    return {
      type: SIGNIN_USER_SUCCESS,
      payload: authUser
    }
  };
  
  export const showAuthLoader = () => {
    return {
      type: SHOW_AUTH_LOADER
    }
  }

  export const clearSignInError = () => {
    return {
      type: CLEAR_SIGNIN_ERROR
    }
  }
  
  export const userSignOut = () => {
    return {
      type: SIGNOUT_USER
    };
  };
