import React from "react";
import { ScreenContext } from "../App";
import "../styles/OrderStatus.css";

export default function OrderStatus() {
    const [, setScreen] = React.useContext(ScreenContext);

    return (
        <>
            {/* Driver name */}
            <div className="status-head">
                <div className="driver">
                    <img src="slash.png" />
                    <h4>Slash Driver</h4>
                </div>

                <h4>5 Min</h4>
            </div>
            {/* Order Status */}
            <div className="status-head">
                <h4>On its way</h4>
            </div>

            <button onClick={() => setScreen("done")}>Done</button>
        </>
    );
}
