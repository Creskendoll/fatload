import React from "react";

interface MarkerProps extends google.maps.MarkerOptions {
    onDragEnd?: (event: google.maps.MapMouseEvent) => void;
}

const Marker: React.FC<MarkerProps> = (options) => {
    const [marker, setMarker] = React.useState<google.maps.Marker>();

    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    React.useEffect(() => {
        if (marker) {
            marker.setOptions(options);
            marker.addListener("dragend", options.onDragEnd);
        }
    }, [marker, options]);

    return null;
};

export default Marker;
