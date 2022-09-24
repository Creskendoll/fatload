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
                    <div>
                        <h4>Slash Driver</h4>
                        <h6>Picked up the order</h6>
                    </div>
                </div>

                <h4>5 Min</h4>
            </div>
            {/* Order Status */}
            <div className="status-head">
                <h5>Is on their way</h5>
            </div>

            <div className="contact">
                <h6>+49 123 1231212</h6>
                <button type="button" className="btn btn-primary">
                    Message
                </button>
            </div>

            <button onClick={() => setScreen("done")}>Done</button>
        </>
    );
}
