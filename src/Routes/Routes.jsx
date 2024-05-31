import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import AllJobs from "../pages/All Jobs/AllJobs";
import AppliedJobs from "../pages/Applied Jobs/AppliedJobs";
import AddAJob from "../pages/Add job/AddAJob";
import MyJobs from "../pages/My Jobs/MyJobs";
import Blogs from "../pages/Blogs/Blogs";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Details from "../pages/Shared/Details/Details";
import UpdateJobs from "../pages/My Jobs/UpdateJob";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Profile from "../pages/Profile/Profile";

const router = createBrowserRouter([
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
                path: '/profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>,
            },
            {
                path: "/allJobs",
                element: <AllJobs></AllJobs>,
                loader: () => fetch(`${import.meta.env.VITE_API_URL}/postedjobs`)
            },
            {
                path: "/appliedJobs",
                element: <PrivateRoute><AppliedJobs></AppliedJobs></PrivateRoute>,
            },
            {
                path: "/addJobs",
                element: <PrivateRoute><AddAJob></AddAJob></PrivateRoute>,
            },
            {
                path: "/myJobs",
                element: <PrivateRoute><MyJobs></MyJobs></PrivateRoute>,
            },
            {
                path: "/blogs",
                element: <Blogs></Blogs>,
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "details/:id",
                element: <PrivateRoute><Details></Details></PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/jobs/${params.id}`),
            },
            {
                path: "/postedJobDetails/:id",
                element: <PrivateRoute><Details></Details></PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/postedjobs/${params.id}`),
            },
            {
                path: '/updateJobs/:id',
                element: <PrivateRoute><UpdateJobs></UpdateJobs></PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/postedjobs/${params.id}`),
            }


        ]
    },
]);

export default router;