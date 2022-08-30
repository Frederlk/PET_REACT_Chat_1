import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../constants/routes";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "..";
import { useContext } from "react";

const Login = lazy(() => import("./Login")),
    Chat = lazy(() => import("./Chat"));

const _AppRouter = () => {
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);

    const applyRoutes = (routes, fallbackPage) => (
        <Routes>
            {routes.map(({ path, Component }) => {
                <Route key={path} path={path} element={Component} />;
            })}
            <Route path="*" element={fallbackPage} />
        </Routes>
    );

    return user ? applyRoutes(privateRoutes, <Chat />) : applyRoutes(publicRoutes, <Login />);
};

export default _AppRouter;
