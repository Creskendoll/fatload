import React from "react";
import { ScreenContext } from "../App";

export default function SearchDrawer() {
    const [, setScreen] = React.useContext(ScreenContext);

    return (
        <>
            <h1>Search...</h1>
            <button onClick={() => setScreen("in-progress")}>Order</button>
        </>
    );
}
