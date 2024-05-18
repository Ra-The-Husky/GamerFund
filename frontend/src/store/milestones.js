import { csrfFetch } from "./csrf";

const LOAD_MILESTONES = "milestones/loadMilestones";
const LOAD_MILESTONE = "milestones/loadMilestone";
const NEW_MILESTONE = "milestones/newMilestone";
const UPDATE_MILESTONE = "milestones/updateMilestone";
const REMOVE_MILESTONE = "milestones/removeMilestone";

//actions
export const loadMilestones = (milestones) => ({
  type: LOAD_MILESTONES,
  milestones,
});

export const loadMilestone = (milestone) => ({
  type: LOAD_MILESTONE,
  milestone,
});

export const newMilestone = (milestone) => ({
  type: NEW_MILESTONE,
  milestone,
});

export const updateMilestone = (milestone) => ({
  type: UPDATE_MILESTONE,
  milestone,
});

export const removeMilestone = (milestone) => ({
  type: REMOVE_MILESTONE,
  milestone,
});

//thunks
export const getAllMilestones = (projectId) => async (dispatch) => {
  const res = await csrfFetch(`/api/projects/${projectId}/milestones`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadMilestones(data));
    return data;
  }
};

export const getOneMilestone = (projectId, milestoneId) => async (dispatch) => {
  const res = await csrfFetch(`/api/projects/${projectId}/milestones/${milestoneId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadMilestone(data));
    return data;
  }
};

export const addMilestone = (milestone) => async (dispatch) => {
  const res = await csrfFetch(`/api/projects/new-project`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(milestone),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(newMilestone(data));
    return data;
  }
};

export const editMilestone = (milestoneId, edits) => async (dispatch) => {
  const res = await csrfFetch(`/api/milestones/${milestoneId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(edits),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(getOneProject(data));
    dispatch(updateMilestone(data));
    return data;
  }
};

export const cancelMilestone = (milestoneId) => async (dispatch) => {
  const res = await csrfFetch(`/api/milestones/${milestoneId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(removeMilestone(data));
    return data;
  }
};

//reducers
const initState = {};

const milestoneReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_MILESTONES:
      return { ...state, milestones: action.milestones };
    case LOAD_MILESTONE:
      return { ...state, milestone: action.milestone};
    case NEW_MILESTONE:
      return { ...state, milestone: action.milestone };
    case UPDATE_MILESTONE:
      return { ...state, milestone: action.milestone };
    default:
      return state;
  }
};

export default milestoneReducer;
