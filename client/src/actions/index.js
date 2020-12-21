import {
  GET_USER,
  NO_USER,
  SIGN_OUT,
  FETCH_ACCOUNTS,
  FETCH_CONTACTS,
  FETCH_OPPORTUNITIES,
  FETCH_METADATA,
} from "./types";
//import salesforceService from "../apis/salesforceService";
import axios from "axios";

// auth actions
export const signIn = (formValues) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/v1/auth/login", formValues);
      dispatch({ type: GET_USER, payload: response.data });
    } catch (error) {
      dispatch({ type: NO_USER, payload: error.response.data });
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/v1/auth/logout");
    dispatch({ type: SIGN_OUT });
  };
};

export const getUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/v1/auth/user");
      dispatch({ type: GET_USER, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: NO_USER, payload: error.response.data });
    }
  };
};

// UI actions
export const changeFormStatus = (status) => {
  return { type: status };
};

// UI actions
export const changeLoadingStatus = (status) => {
  return { type: status };
};

// Account Actions
export const fetchAccounts = (params) => {
  return async (dispatch) => {
    const response = await axios.get(
      `/api/v1/sobjects/Account?limit=10&page=1`
    );
    dispatch({ type: FETCH_ACCOUNTS, payload: response.data });
  };
};

// Contact Actions
export const fetchContacts = (params) => {
  return async (dispatch) => {
    const response = await axios.get(
      `/api/v1/sobjects/Contact?limit=10&page=1`
    );
    dispatch({ type: FETCH_CONTACTS, payload: response.data });
  };
};

// Opportunity Actions
export const fetchOpportunities = (params) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/v1/sobjects/Opportunity`, {
      params: params,
    });
    dispatch({ type: FETCH_OPPORTUNITIES, payload: response.data });
  };
};

export const fetchMetadata = (type) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/v1/sobjects/metadata/${type}`);
    console.log(response.data.data);
    dispatch({ type: FETCH_METADATA, payload: response.data.data });
  };
};
