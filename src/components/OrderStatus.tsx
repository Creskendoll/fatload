import React from "react";
import { ScreenContext } from "../App";
import "../styles/OrderStatus.css";
import "../styles/inProgress.css"


export default function OrderStatus() {
    const [, setScreen] = React.useContext(ScreenContext);

    return (
        <div className="inProgress">
            {/* Driver name */}
           

        
            <div className="status-head">
                <div className="driver">
                    <img src="slash.png" />
                    <div>
                        <h4>Slash Driver</h4>
                        <h6>Picked up the order</h6>
                    </div>
                </div>

                <h4 className="mainColor">5 Min</h4>
            </div>
            {/* Order Status */}
            <div className="status-head">
                <h5>Is on their way</h5>
            </div>

            <div className="contact">
                <h6>+49 123 1231212</h6>
                <a id='messageDriverLink' type="button" className="mainColor">
                    Message
                </a>
            </div>

            {/* <button onClick={() => setScreen("done")}>Done</button> */}
            </div>
    );
}
