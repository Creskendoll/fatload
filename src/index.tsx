import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Status, Wrapper } from "@googlemaps/react-wrapper";

const render = (status: Status) => {
    return <h1>{status}</h1>;
};

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Wrapper
            apiKey={"AIzaSyDNAJ4hwTlg3z58M3WLFuiLLCQ3h7DbcZI"}
            render={render}
        >
            <App />
        </Wrapper>
    </React.StrictMode>
)