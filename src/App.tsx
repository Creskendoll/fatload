import React from "react";
import logo from "./logo.svg";
// @ts-ignore
import GoogleMapReact from "google-map-react";
import "./App.css";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
            <div style={{ height: "100vh", width: "100vw" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: "AIzaSyD4f6FxUaQEAONNrrr9-IrNV1u8BCaRJpY",
                        client: "AIzaSyD4f6FxUaQEAONNrrr9-IrNV1u8BCaRJpY",
                    }}
                    defaultCenter={{ lat: 15, lng: 15 }}
                    defaultZoom={12}
                >
                    <span>asd</span>
                </GoogleMapReact>
            </div>
        </div>
    );
}

export default App;
