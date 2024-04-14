import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
import * as sessionActions from "./store/session";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return <>{isLoaded && <Outlet />}</>;
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>GamerFund Coming Soon!</h1>,
      },
      {
        path: "/login",
        element: <LoginFormPage />,
      },
      {
        path: "/signup",
        element: <SignupFormPage />,
      },
      {
        path: "*",
        element: <h1>Not Found, My Friend</h1>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
