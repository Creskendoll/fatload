import React from "react";
import "../styles/donePage.css";
import { motion } from "framer-motion";
import { ScreenContext } from "../App";

const EndPage = () => {
    const DELAY: number = 0.5;
    const DURATION: number = 0.7;
    const TEXT: string = "Your load has been delivered!";
    const [, setScreen] = React.useContext(ScreenContext);

    return (
        <div id="donepage">
            <motion.img
                animate={{ opacity: [0, 1] }}
                transition={{ delay: DELAY, duration: 0.25 }}
                id="correctLogo"
                src="/end_correct.svg"
                alt="correctLogo"
            />
            <span id="correctLogo_bg"></span>
            <motion.img
                animate={{ opacity: [0, 1], x: [-100, -55] }}
                transition={{ delay: DELAY, duration: DURATION }}
                id="bikeLogo"
                src="/bike.png"
                alt="bikeLogo"
            />
            <motion.div
                id="confirmation_message"
                animate={{ y: [-100, 15, 0] }}
                transition={{ duration: DURATION }}
            >
                {TEXT}
                <br />
                <button
                    id="reload-btn"
                    className="btn btn-primary"
                    onClick={() => setScreen("landing")}
                >
                    Order Again
                </button>
            </motion.div>
        </div>
    );
};

export default EndPage;
