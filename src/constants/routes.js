import { Chat, Login } from "../_pages";

export const LOGIN_ROUTE = "/login";
export const CHAT_ROUTE = "/chat";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login,
    },
];

export const privateRoutes = [
    {
        path: CHAT_ROUTE,
        Component: Chat,
    },
];
