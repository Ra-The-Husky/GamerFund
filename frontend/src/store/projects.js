import { csrfFetch } from "./csrf";

const LOAD_PROJECTS = "projects/loadProjects";
const LOAD_USER_PROJECTS = "projects/loadUserProjects";
const LOAD_PROJECT = "projects/loadProject";
const NEW_PROJECT = "projects/newProject";
const UPDATE_PROJECT = "projects/updateProject";
const REMOVE_PROJECT = "projects/removeProject";

//actions
export const loadProjects = (projects) => ({
  type: LOAD_PROJECTS,
  projects,
});

export const loadProject = (project) => ({
  type: LOAD_PROJECT,
  project,
});

export const loadUserProjects = (projects) => ({
  type: LOAD_USER_PROJECTS,
  projects,
});

export const newProject = (project) => ({
  type: NEW_PROJECT,
  project,
});

export const updateProject = (project) => ({
  type: UPDATE_PROJECT,
  project,
});

// export const removeProject = (projectId) => ({
//     type:
// })

//thunks
export const getAllProjects = () => async (dispatch) => {
  const res = await csrfFetch("/api/projects");

  if (res.ok) {
    const data = await res.json();
    dispatch(loadProjects(data.Projects));
    return data;
  }
};

export const getUserProjects = () => async (dispatch) => {
  const res = await csrfFetch("/api/projects/account/projects");

  if (res.ok) {
    const data = await res.json();
    dispatch(loadUserProjects(data.Projects));
    return data;
  }
};

export const getOneProject = (projectId) => async (dispatch) => {
  const res = await csrfFetch(`/api/projects/${projectId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadProject(data));
    return data;
  }
};

export const addProject = (project) => async (dispatch) => {
  const res = await csrfFetch(`/api/projects/new-project`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(newProject(data));
    return data;
  }
};

export const editProject = (projectId, edits) => async (dispatch) => {
  const res = await csrfFetch(`/api/projects/${projectId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(edits),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(getOneProject(data));
    dispatch(updateProject(data));
    return data;
  }
};

//reducers
const initState = {};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_PROJECTS:
      return { ...state, projects: action.projects };
    case LOAD_USER_PROJECTS:
      const accountState = {};
      return { ...accountState, projects: action.projects };
    case LOAD_PROJECT:
      const projectState = {};
      return { ...projectState, project: action.project };
    case NEW_PROJECT:
      const newProjectState = {};
      return { ...newProjectState, project: action.project };
    case UPDATE_PROJECT:
      const updateProjectState = {};
      return { ...updateProjectState, project: action.project };
    default:
      return state;
  }
};

export default projectReducer;
