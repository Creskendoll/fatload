import React from "react";
import { ScreenContext } from "../App";
import "../styles/Drawer.css";

export default function DrawerContainer({ children }) {
    const [screen] = React.useContext(ScreenContext);

    return (
        <div
            className="drawer"
            style={
                screen === "search-location"
                    ? {
                          height: "100vh",
                      }
                    : undefined
            }
        >
            <div className="divider"></div>
            {children}
        </div>
    );
}
