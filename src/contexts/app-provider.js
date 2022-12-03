import React from "react";

import { NotificationsContextProvider } from "./notification";

const AppProvider = ({ children }) => {
    return (
        <NotificationsContextProvider>{children}</NotificationsContextProvider>
    );
};

export default AppProvider;
