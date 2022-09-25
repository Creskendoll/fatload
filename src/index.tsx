import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { Wrapper } from "@googlemaps/react-wrapper";
import { GOOGLE_API_KEY } from "./constants";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Wrapper apiKey={GOOGLE_API_KEY}>
            <App />
        </Wrapper>
    </React.StrictMode>
);
