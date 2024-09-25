import { csrfFetch } from "./csrf";

const LOAD_DISCUSSIONS = "devPosts/loadDevPosts";
const LOAD_USER_DISCUSSIONS = "devPosts/loadUserDevPosts";
const LOAD_DISCUSSION = "devPosts/loadDevPost";
const NEW_DISCUSSION = "devPosts/newDevPost";
const UPDATE_DISCUSSION = "devPosts/updateDevPost";
const REMOVE_DISCUSSION = "devPosts/removeDevPost";
const LIKE_DISCUSSION = "devPosts/likeDevPost";
const DISLIKE_DISCUSSION = "devPosts/dislikeDevPost"

//actions
export const loadDevPosts = (devPosts) => ({
  type: LOAD_DISCUSSIONS,
  devPosts,
});

export const loadDevPost = (devPost) => ({
  type: LOAD_DISCUSSION,
  devPost,
});

export const loadUserDevPosts = (devPosts) => ({
  type: LOAD_USER_DISCUSSIONS,
  devPosts,
});

export const newDevPost = (devPost) => ({
  type: NEW_DISCUSSION,
  devPost,
});

export const updateDevPost = (devPost) => ({
  type: UPDATE_DISCUSSION,
  devPost,
});

export const removeDevPost = (devPost) => ({
  type: REMOVE_DISCUSSION,
  devPost,
});

export const likeDevPost = (devPost) => ({
  type: LIKE_DISCUSSION,
  devPost,
});

export const dislikeDevPost = (devPost) => ({
  type: DISLIKE_DISCUSSION,
  devPost,
});

//thunks
export const getAllDevPosts = (projectId) => async (dispatch) => {
  const res = await csrfFetch(`/api/projects/${projectId}/devPosts`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadDevPosts(data));
    return data;
  }
};

export const getUserDevPosts = () => async (dispatch) => {
    const res = await csrfFetch("/api/account/devPosts");

    if (res.ok) {
      const data = await res.json();
      dispatch(loadUserDevPosts(data.devPosts));
      return data;
    }
  };

  export const getOneDevPost = (devPostId) => async (dispatch) => {
    const res = await csrfFetch(`/api/devPosts/${devPostId}`);

    if (res.ok) {
      const data = await res.json();
      dispatch(loadDevPost(data));
      return data;
    }
  };

  export const addDevPost = (projectId, devPost) => async (dispatch) => {
    const res = await csrfFetch(`/api/projects/${projectId}/devPosts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(devPost),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(getAllDevPosts(projectId));
      dispatch(newDevPost(data));
      return data;
    }
  };

  export const editDevPost = (devPostId, edits) => async (dispatch) => {
    const res = await csrfFetch(`/api/devPosts/${devPostId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(edits),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(getAllDevPosts(data.projectId));
      dispatch(updateDevPost(data));
      return data;
    }
  };

  export const cancelDevPost = (devPostId) => async (dispatch) => {
    const res = await csrfFetch(`/api/devPosts/${devPostId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllDevPosts(data.project.id));
      dispatch(removeDevPost(data));
      return data;
    }
  };

  export const liked = (devPostId, likes) => async (dispatch) => {
    const res = await csrfFetch(`/api/devPosts/${devPostId}/like`, {
      method: "PUT",
      body: JSON.stringify(likes),
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllDevPosts(data.projectId));
      dispatch(likeDevPost(data));
      return data;
    }
  };

  export const disliked = (devPostId, dislikes) => async (dispatch) => {
    const res = await csrfFetch(`/api/devPosts/${devPostId}/dislike`, {
      method: "PUT",
      body: JSON.stringify(dislikes),
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllDevPosts(data.projectId));
      dispatch(dislikeDevPost(data));
      return data;
    }
  };

//reducers
const initState = {};

const devPostReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_DISCUSSIONS:
      return { ...state, devPosts: action.devPosts };
    case LOAD_USER_DISCUSSIONS:
      return { ...state, devPosts: action.devPosts };
    case LOAD_DISCUSSION:
      return { ...state, devPost: action.devPost };
    case NEW_DISCUSSION:
      return { ...state, devPost: action.devPost };
    case UPDATE_DISCUSSION:
      return { ...state, devPost: action.devPost };
    default:
      return state;
  }
};

export default devPostReducer
