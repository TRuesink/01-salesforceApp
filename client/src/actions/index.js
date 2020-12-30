import {
  GET_USER,
  NO_USER,
  SIGN_OUT,
  FETCH_ACCOUNTS,
  FETCH_CONTACTS,
  FETCH_OPPORTUNITIES,
  FETCH_METADATA,
  CREATE_OPPORTUNITY,
  FETCH_PATHS,
  UPDATE_OPPORTUNITY,
  VIEW,
  FETCH_TASKS,
  UPDATE_TASK,
  CREATE_TASK,
  IN_PROGRESS_OPPORTUNITY,
  IN_PROGRESS_ACCOUNT,
  IN_PROGRESS_TASK,
  IN_PROGRESS_USER,
  FETCH_GROUPS,
  IN_PROGRESS_GROUPS,
  IN_PROGRESS_LEAD,
  FETCH_LEADS,
  UPDATE_LEAD,
  CREATE_LEAD,
  ERROR,
  NO_ERROR,
  CREATE_ACCOUNT,
  UPDATE_ACCOUNT,
  OPPORTUNITY_SEARCH,
  LEAD_SEARCH,
  ACCOUNT_SEARCH,
  IN_PROGRESS_CONTACT,
  CREATE_CONTACT,
  UPDATE_CONTACT,
  CONTACT_SEARCH,
} from "./types";
import axios from "axios";
import history from "../history";

// error action
export const errorActionCreator = (errorType, error) => {
  return { type: errorType, error: true, payload: error };
};

// auth actions
export const signIn = (formValues) => {
  return async (dispatch) => {
    dispatch({ type: IN_PROGRESS_USER });
    try {
      const response = await axios.post("/api/v1/auth/login", formValues);
      dispatch({ type: GET_USER, payload: response.data });
      dispatch({ type: NO_ERROR });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: NO_USER, payload: error.response.data });
      dispatch({ type: ERROR, payload: error.response });
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    await axios.get("/api/v1/auth/logout");
    dispatch({ type: SIGN_OUT });
  };
};

export const getUser = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_USER });
      const response = await axios.get("/api/v1/auth/user");
      dispatch({ type: GET_USER, payload: response.data });
      dispatch({ type: NO_ERROR });
    } catch (error) {
      dispatch({ type: NO_USER, payload: error.response.data });
      dispatch({ type: ERROR, payload: error.response });
    }
  };
};

export const changeEditMode = (status) => {
  return { type: status };
};

// ACCOUNT ACTIONS
// Fetctch accounts
export const fetchAccounts = (params) => {
  return async (dispatch) => {
    dispatch({ type: IN_PROGRESS_ACCOUNT });
    const response = await axios.get(`/api/v1/sobjects/Account`, {
      params: params,
    });
    dispatch({ type: FETCH_ACCOUNTS, payload: response.data });
  };
};

// create account
export const createAccount = (formValues) => {
  return async (dispatch) => {
    dispatch({ type: IN_PROGRESS_ACCOUNT });
    const response = await axios.post(`/api/v1/sobjects/Account`, formValues);
    dispatch({ type: CREATE_ACCOUNT, payload: response.data });
    history.push("/accounts");
  };
};

// update an account
export const updateAccount = (id, formValues) => {
  return async (dispatch) => {
    dispatch({ type: IN_PROGRESS_ACCOUNT });
    const response = await axios.put(
      `/api/v1/sobjects/Account/${id}`,
      formValues
    );
    dispatch({ type: UPDATE_ACCOUNT, payload: response.data });
    dispatch({ type: VIEW });
  };
};

// CONTACT ACTIONS
// fetch contacts
export const fetchContacts = (params) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_CONTACT });
      const response = await axios.get(`/api/v1/sobjects/Contact`, {
        params: params,
      });
      dispatch({ type: FETCH_CONTACTS, payload: response.data });
      dispatch({ type: NO_ERROR });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: ERROR, payload: error.response });
    }
  };
};

// create contact
export const createContact = (formValues) => {
  return async (dispatch) => {
    dispatch({ type: IN_PROGRESS_CONTACT });
    const response = await axios.post(`/api/v1/sobjects/Contact`, formValues);
    dispatch({ type: CREATE_CONTACT, payload: response.data });
    history.push("/contacts");
  };
};

// update a contact
export const updateContact = (id, formValues) => {
  return async (dispatch) => {
    dispatch({ type: IN_PROGRESS_CONTACT });
    const response = await axios.put(
      `/api/v1/sobjects/Contact/${id}`,
      formValues
    );
    dispatch({ type: UPDATE_CONTACT, payload: response.data });
    dispatch({ type: VIEW });
  };
};

// OPPORTUNITY ACTIONS
// get opportunities
export const fetchOpportunities = (params) => {
  return async (dispatch) => {
    dispatch({ type: IN_PROGRESS_OPPORTUNITY });
    const response = await axios.get(`/api/v1/sobjects/Opportunity`, {
      params: params,
    });
    dispatch({ type: FETCH_OPPORTUNITIES, payload: response.data });
  };
};

// create an opportunity
export const createOpportunity = (formValues) => {
  return async (dispatch) => {
    dispatch({ type: IN_PROGRESS_OPPORTUNITY });
    const response = await axios.post(
      `/api/v1/sobjects/Opportunity`,
      formValues
    );
    dispatch({ type: CREATE_OPPORTUNITY, payload: response.data });
    history.push("/opportunities");
  };
};

// update an opportunity
export const updateOpportunity = (id, formValues) => {
  return async (dispatch) => {
    dispatch({ type: IN_PROGRESS_OPPORTUNITY });
    const response = await axios.put(
      `/api/v1/sobjects/Opportunity/${id}`,
      formValues
    );
    dispatch({ type: UPDATE_OPPORTUNITY, payload: response.data });
    dispatch({ type: VIEW });
  };
};

// TASK ACTIONS
// fetch tasks
export const fetchTasks = (params) => {
  return async (dispatch) => {
    dispatch({ type: IN_PROGRESS_TASK });
    const response = await axios.get(`/api/v1/sobjects/Task`, {
      params: params,
    });
    dispatch({ type: FETCH_TASKS, payload: response.data });
  };
};
// update task
export const updateTask = (id, formValues) => {
  return async (dispatch) => {
    dispatch({ type: IN_PROGRESS_TASK });
    const response = await axios.put(`/api/v1/sobjects/Task/${id}`, formValues);
    dispatch({ type: UPDATE_TASK, payload: response.data });
  };
};

//create task
export const createTask = (type, formValues) => {
  return async (dispatch) => {
    dispatch({ type: IN_PROGRESS_TASK });
    const response = await axios.post(`/api/v1/sobjects/Task`, formValues);
    dispatch({ type: CREATE_TASK, payload: response.data });
    history.push(`/${type}/${formValues.WhatId || formValues.WhoId}/tasks`);
  };
};

// metadata actions
export const fetchMetadata = (type) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/v1/sobjects/metadata/${type}`);
    dispatch({ type: FETCH_METADATA, payload: response.data.data });
  };
};

// fetch paths
export const fetchPaths = () => {
  return async (dispatch) => {
    const response = await axios.get(`/api/v1/metadata/PathAssistant`);
    dispatch({ type: FETCH_PATHS, payload: response.data.data });
  };
};

// CHATTER ACTIONS
// Fetch groups
export const fetchGroups = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_GROUPS });
      const response = await axios.get(`/api/v1/chatter/groups`);
      dispatch({ type: FETCH_GROUPS, payload: response.data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: ERROR, payload: error.response });
    }
  };
};

// LEAD ACTIONS
// get all leads
export const fetchLeads = (params) => {
  return async (dispatch) => {
    dispatch({ type: IN_PROGRESS_LEAD });
    const response = await axios.get(`/api/v1/sobjects/Lead`, {
      params: params,
    });
    dispatch({ type: FETCH_LEADS, payload: response.data });
  };
};

// update a lead
export const updateLead = (id, formValues) => {
  return async (dispatch) => {
    dispatch({ type: IN_PROGRESS_LEAD });
    const response = await axios.put(`/api/v1/sobjects/Lead/${id}`, formValues);
    dispatch({ type: UPDATE_LEAD, payload: response.data });
    dispatch({ type: VIEW });
  };
};

// create a lead
export const createLead = (formValues) => {
  return async (dispatch) => {
    dispatch({ type: IN_PROGRESS_LEAD });
    const response = await axios.post(`/api/v1/sobjects/Lead`, formValues);
    dispatch({ type: CREATE_LEAD, payload: response.data });
    history.push("/leads");
  };
};

//search action
export const searchOpportunities = (type, term, fields) => {
  return async (dispatch) => {
    dispatch({ type: IN_PROGRESS_OPPORTUNITY });
    const response = await axios.get(`/api/v1/sobjects/search/${type}`, {
      params: { term: term, fields: fields },
    });
    dispatch({ type: OPPORTUNITY_SEARCH, payload: response.data });
  };
};

export const searchLeads = (type, term, fields) => {
  return async (dispatch) => {
    dispatch({ type: IN_PROGRESS_LEAD });
    const response = await axios.get(`/api/v1/sobjects/search/${type}`, {
      params: { term: term, fields: fields },
    });
    dispatch({ type: LEAD_SEARCH, payload: response.data });
  };
};

export const searchAccounts = (type, term, fields) => {
  return async (dispatch) => {
    dispatch({ type: IN_PROGRESS_ACCOUNT });
    const response = await axios.get(`/api/v1/sobjects/search/${type}`, {
      params: { term: term, fields: fields },
    });
    dispatch({ type: ACCOUNT_SEARCH, payload: response.data });
  };
};

export const searchContacts = (type, term, fields) => {
  return async (dispatch) => {
    dispatch({ type: IN_PROGRESS_CONTACT });
    const response = await axios.get(`/api/v1/sobjects/search/${type}`, {
      params: { term: term, fields: fields },
    });
    dispatch({ type: CONTACT_SEARCH, payload: response.data });
  };
};
