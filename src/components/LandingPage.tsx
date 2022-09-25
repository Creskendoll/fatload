import React from "react";
import "../styles/landingPageStyling.css";

export const LandingPage = ({ setScreen }) => {
    return (
        <section className="landingPage">
            {/* <button onClick={() => setScreen("map")}>Next</button> */}
            <img id="mainLogo" alt="" src="/mainLogo.svg"></img>
            <div>
                <h1>Omegaload</h1>
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
