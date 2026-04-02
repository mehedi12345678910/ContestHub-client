import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../layouts/Dashboard";
import AddContest from "../Dashboard/Pages/AddContest";
import AllContest from "../Pages/AllContest/AllContest";
import ContestDetails from "../Dashboard/Pages/ContestDetails/ContestDetails";
import MyContest from "../Dashboard/Pages/MyContest/MyContest";
import UpdateContest from "../Dashboard/UpdateContest/UpdateContest";
import ContestSubmission from "../Dashboard/Pages/ContestSubmission.jsx/ContestSubmission";
import ManageUsers from "../Dashboard/Pages/ManageUsers/ManageUsers";
import ManageContest from "../Dashboard/Pages/ManageContest/ManageContest";
import Payment from "../Dashboard/Pages/Payment/Payment";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyParticipatedContest from "../Dashboard/Pages/MyParticipatedContest/MyParticipatedContest";
import MyWinningContest from "../Dashboard/Pages/MyWinningContest/MyWinningContest";
import Profile from "../Dashboard/Pages/Profile/Profile";
import Admin from "./Admin";
import Creator from "./Creator";
import LeaderBoard from "../Pages/LeaderBoard/LeaderBoard";
import ParticipationProgress from "../Pages/ParticipationProgress/ParticipationProgress";
import About from "../Pages/About/About";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "allContest",
        element: <AllContest></AllContest>,
      },
      {
        path: "contestDetails/:id",
        element: <ContestDetails></ContestDetails>,
        loader: ({ params }) =>
          fetch(
            // `https://contest-hub-server-site.vercel.app/contests/${params.id}`
            `https://contest-hub-server-dun.vercel.app/${params.id}`
          ),
      },
      {
        path: "payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            // `https://contest-hub-server-site.vercel.app/contests/${params.id}`
            `https://contest-hub-server-dun.vercel.app/${params.id}`
          ),
      },
      {
        path: "leaderBoard",
        element: <LeaderBoard />,
      },
      {
        path: "progress",
        element: <ParticipationProgress />,
      },
      {
        path: "about",
        element: <About></About>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },

  // dashboard routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // admin routes
      {
        path: "manageUsers",
        element: (
          <PrivateRoute>
            <Admin>
              <ManageUsers />
            </Admin>
          </PrivateRoute>
        ),
      },
      {
        path: "manageContest",
        element: (
          <PrivateRoute>
            <Admin>
              <ManageContest />
            </Admin>
          </PrivateRoute>
        ),
      },

      // creator routes
      {
        path: "addContest",
        element: (
          <PrivateRoute>
            <Creator>
              <AddContest></AddContest>
            </Creator>
          </PrivateRoute>
        ),
      },
      {
        path: "myContest",
        element: (
          <PrivateRoute>
            <MyContest></MyContest>
          </PrivateRoute>
        ),
      },
      {
        path: "updateContest/:id",
        element: (
          <PrivateRoute>
            <UpdateContest />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            // `https://contest-hub-server-site.vercel.app/contests/${params.id}`
            `https://contest-hub-server-dun.vercel.app/${params.id}`
          ),
      },
      {
        path: "submittedContest",
        element: (
          <PrivateRoute>
            <Creator>
              <ContestSubmission></ContestSubmission>
            </Creator>
          </PrivateRoute>
        ),
      },

      // guest routes
      {
        path: "myParticipatedContest",
        element: (
          <PrivateRoute>
            <MyParticipatedContest></MyParticipatedContest>
          </PrivateRoute>
        ),
      },
      {
        path: "myWinningContest",
        element: (
          <PrivateRoute>
            <MyWinningContest></MyWinningContest>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Router;
