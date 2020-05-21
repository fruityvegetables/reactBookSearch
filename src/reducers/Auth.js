import {
    SIGNIN_SUCCESS,
    SIGNIN_FAILURE_SERVER,
    SIGNIN_FAILURE_OTHERS,
    SHOW_AUTH_LOADER,
    CLEAR_SIGNIN_ERROR,
    LOGOUT_USER,
    LOGOUT_USER_ON_TOKEN_EXPIRY
  } from "constants/ActionTypes";
  
  const INIT_STATE = {
      isSignedIn: true,
      signinErrors: {},
      authUser: JSON.parse(localStorage.getItem('user')),
      isAuthLoading: false,
      sessionStartTime: 0,
      isSignedOutForToken: false
  };
  
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case SHOW_AUTH_LOADER: {
          return {
            ...state,
            isAuthLoading: true
          }
      }
      case SIGNIN_SUCCESS: {
        const { signInTime, user } = action.payload;
        return {
          ...state,
          authUser: user,
          isSignedIn: true,
          isAuthLoading: false,
          sessionStartTime: signInTime,
          isSignedOutForToken: false
        }
      }
      case SIGNIN_FAILURE_SERVER: {
        return {
          ...state,
          isAuthLoading: false,
          signinErrors: {
              error: 'Something seems to be wrong. We are working towards resolving it'
          }
        }
      }
      case SIGNIN_FAILURE_OTHERS: {
        return {
          ...state,
          isAuthLoading: false,
          signinErrors: {
              error: action.payload
          }
        }
      }
      case CLEAR_SIGNIN_ERROR: {
        return {
          ...state,
          isAuthLoading: false,
          signinErrors: {
              error: ''
          }
        }
      }
      case LOGOUT_USER: {
        return {
          ...state,
          isSignedIn: false
        }
      }
      case LOGOUT_USER_ON_TOKEN_EXPIRY: {
        return {
          ...state,
          isSignedIn: false,
          isSignedOutForToken: true
        }
      }
      default:
        return state;
    }
  }
  