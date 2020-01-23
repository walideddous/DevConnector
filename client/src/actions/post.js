import axios from 'axios';
import {
  POST_ERROR,
  GET_POSTS,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT
} from './types';
import { setAlert } from './alert';

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (ex) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status }
    });
  }
};

//Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (ex) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status }
    });
  }
};
//Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (ex) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status }
    });
  }
};
//Delete post
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (ex) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status }
    });
  }
};
//Add post
export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'Application/json'
    }
  };
  try {
    const res = await axios.post(`/api/posts/`, formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Added', 'success'));
  } catch (ex) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status }
    });
  }
};

// Get post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (ex) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status }
    });
  }
};

//Add comment
export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'Application/json'
    }
  };
  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (ex) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status }
    });
  }
};
//Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: ADD_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Deleted', 'success'));
  } catch (ex) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status }
    });
  }
};
