import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";
import LandingPage from "./components/LandingPage";
import AccountPage from "./components/AccountPage";
import UserProjects from "./components/AccountPage/UserProjects";
import ProjectDetails from "./components/Projects/ProjectDetails/ProjectDetails";
import AddProject from "./components/Projects/AddProject";
import UpdateProject from "./components/Projects/UpdateProject";
import RemovedSuccess from "./components/Projects/DestroyProject";
import ProjectMilestones from "./components/Milestones/ProjectMilestones";
import AllDiscussions from "./components/Discussions/ProjectDiscussions/ProjectDiscussions";
import AllDevPosts from "./components/DevPosts/ProjectDevPosts/ProjectDevPosts";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
      {
        path: "/account/projects",
        element: <UserProjects />,
      },
      {
        path: "/:projectId",
        element: <ProjectDetails />,
      },
      {
        path: '/:projectId/devPosts',
        element: <AllDevPosts />
      },
      {
        path: '/:projectId/milestones',
        element: <ProjectMilestones />
      },
      {
        path: "/:projectId/discussions",
        element: <AllDiscussions />,
      },
      {
        path: "/new-project",
        element: <AddProject />,
      },
      {
        path: "/:projectId/edit",
        element: <UpdateProject />,
      },
      {
        path: "/remove-success",
        element: <RemovedSuccess />,
      },

    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
