import React from "react";
import "../styles/landingPageStyling.css";
import { ScreenContext } from "../App";

export const LandingPage = () => {
    const [, setScreen] = React.useContext(ScreenContext);

    return (
        <section className="landingPage">
            {/* <button onClick={() => setScreen("map")}>Next</button> */}
            <img id="mainLogo" alt="" src="/mainLogoRedesigned.svg"></img>
            <div>
                <h1>FATLOAD</h1>
                <p id="summaryParagraph"> Quick. On Demand. Sustainable</p>
            </div>

            <img
                id="ctaButton"
                onClick={() => setScreen("map")}
                alt="ctaButton"
                src="/ctaButton.svg"
            ></img>
        </section>
    );
};
