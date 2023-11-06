import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import TasksHome from "../components/Tasks/TasksHome/TasksHome";
import PrivateRoute from "./Privateroute";
import TaskView from "../components/Tasks/TaskView/TaskView";
import TaskEdit from "../components/Tasks/TaskEdit/TaskEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/tasks",
        element: (
          <PrivateRoute>
            <TasksHome></TasksHome>
          </PrivateRoute>
        ),
      },
      {
        path: "/tasks/view/:id",
        element: (
          <PrivateRoute>
            <TaskView></TaskView>
          </PrivateRoute>
        ),
      },
      {
        path: "/tasks/edit/:id",
        element: (
          <PrivateRoute>
            <TaskEdit></TaskEdit>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
