import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProjectNavBar from "./components/Projects/ProjectNavBar";
import * as sessionActions from "./store/session";
import LandingPage from "./components/LandingPage";
import AccountPage from "./components/AccountPage";
import UserProjects from "./components/AccountPage/UserProjects";
import ProjectDetails from "./components/Projects/ProjectDetails/ProjectDetails";
import AddProject from "./components/Projects/AddProject";
import UpdateProject from "./components/Projects/UpdateProject";
import RemovedSuccess from "./components/Projects/DestroyProject";
import AllDiscussions from "./components/Discussions/ProjectDiscussions/ProjectDiscussions";

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
