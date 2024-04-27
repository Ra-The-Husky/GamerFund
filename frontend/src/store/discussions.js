import { csrfFetch } from "./csrf";

const LOAD_DISCUSSIONS = "discussions/loadDiscussions";
const LOAD_USER_DISCUSSIONS = "discussions/loadUserDiscussions";
const LOAD_DISCUSSION = "discussions/loadDiscussion";
const NEW_DISCUSSION = "discussions/newDiscussion";
const UPDATE_DISCUSSION = "discussions/updateDiscussion";
const REMOVE_DISCUSSION = "discussions/removeDiscussion";

//actions
export const loadDiscussions = (discussions) => ({
  type: LOAD_DISCUSSIONS,
  discussions,
});

export const loadDiscussion = (discussion) => ({
  type: LOAD_DISCUSSION,
  discussion,
});

export const loadUserDiscussions = (discussions) => ({
  type: LOAD_USER_DISCUSSIONS,
  discussions,
});

export const newDiscussion = (discussion) => ({
  type: NEW_DISCUSSION,
  discussion,
});

export const updateDiscussion = (discussion) => ({
  type: UPDATE_DISCUSSION,
  discussion,
});

export const removeDiscussion = (discussion) => ({
  type: REMOVE_DISCUSSION,
  discussion,
});

//thunks
export const getAllDiscussions = (projectId) => async (dispatch) => {
  const res = await csrfFetch(`/api/projects/${projectId}/discussions`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadDiscussions(data));
    return data;
  }
};

export const getUserDiscussions = () => async (dispatch) => {
  const res = await csrfFetch("/api/account/discussions");

  if (res.ok) {
    const data = await res.json();
    dispatch(loadUserDiscussions(data.discussions));
    return data;
  }
};

export const getOneDiscussion = (discussionId) => async (dispatch) => {
  const res = await csrfFetch(`/api/discussions/${discussionId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadDiscussion(data));
    return data;
  }
};

export const addDiscussion = (projectId, discussion) => async (dispatch) => {
  const res = await csrfFetch(`/api/projects/${projectId}/discussions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(discussion),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(getAllDiscussions(projectId));
    dispatch(newDiscussion(data));
    return data;
  }
};

export const editDiscussion = (discussionId, edits) => async (dispatch) => {
  const res = await csrfFetch(`/api/discussions/${discussionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(edits),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(getAllDiscussions(data.projectId));
    dispatch(updateDiscussion(data));
    return data;
  }
};

export const cancelDiscussion = (discussionId) => async (dispatch) => {
  const res = await csrfFetch(`/api/discussions/${discussionId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(removeDiscussion(data));
    return data;
  }
};

//reducers
const initState = {};

const discussionReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_DISCUSSIONS:
      return { ...state, discussions: action.discussions };
    case LOAD_USER_DISCUSSIONS:
      const accountState = {};
      return { ...accountState, discussions: action.discussions };
    case LOAD_DISCUSSION:
      return { ...state, discussion: action.discussion };
    case NEW_DISCUSSION:
      return { ...state, discussion: action.discussion };
    case UPDATE_DISCUSSION:
      const updateDiscussionState = {};
      return { ...updateDiscussionState, discussion: action.discussion };
    default:
      return state;
  }
};

export default discussionReducer;
