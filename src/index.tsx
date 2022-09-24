import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { GOOGLE_API_KEY } from "./constants";

const render = (status: Status) => {
    return <h1>{status}</h1>;
};

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Wrapper apiKey={GOOGLE_API_KEY} render={render}>
            <App />
        </Wrapper>
    </React.StrictMode>
);
