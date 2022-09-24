import React, { useEffect } from "react";

function Map() {
    const ref = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        new window.google.maps.Map(ref?.current as any, {
            center: {
                lat: 52.5,
                lng: 13.4,
            },
            zoom: 12,
        });
    }, []);
    return (
        <div style={{ height: "100vh", width: "100vw" }} ref={ref} id="map" />
    );
}

export default Map;
