import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS
} from './types';
import { setAlert } from './alert';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (ex) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status }
    });
  }
};
// get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/profile');
    dispatch({ type: GET_PROFILES, payload: res.data });
  } catch (ex) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status }
    });
  }
};
// get profile by id
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (ex) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status }
    });
  }
};
// get github repos
export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({ type: GET_REPOS, payload: res.data });
  } catch (ex) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status }
    });
  }
};

// Create or update profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(
      setAlert(edit ? 'Profile Updated ' : 'Profile Created ', 'success')
    );

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (ex) {
    const errors = ex.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status }
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (ex) {
    const errors = ex.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status }
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (ex) {
    const errors = ex.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status }
    });
  }
};

//Delete Experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete('/api/profile/experience/' + id);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (ex) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status }
    });
  }
};
//Delete Education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete('/api/profile/education/' + id);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (ex) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status }
    });
  }
};
//Delete Account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure ? this can NOT be undone')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your Account has been permanently deleted'));
    } catch (ex) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: ex.response.statusText, status: ex.response.status }
      });
    }
  }
};
