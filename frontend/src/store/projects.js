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

// export const  loadUserProjects = (projects) => ({
//     type: LOAD_USER_PROJECTS,
//     projects
// })

// export const  newProject = (project) => ({
//     type:
// })

// export const updateProject = (project) => ({
//     type:
// })

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

//reducers
const initState = {};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_PROJECTS:
      return { ...state, projects: action.projects };
    default:
      return state;
  }
};

export default projectReducer;
