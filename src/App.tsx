import React, { useEffect, useState } from "react";
import "./styles/App.css";
import Map from "./Map";
import Marker from "./Marker";

function App() {
    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = React.useState(12);
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: 52.5,
        lng: 13.4,
    });
    const dirService = React.useRef(new google.maps.DirectionsService());
    const dirRenderer = React.useRef(
        new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            suppressBicyclingLayer: true,
        })
    );

    function fetchDestination(
        origin: google.maps.LatLng,
        destination: google.maps.LatLng
    ) {
        dirService.current.route(
            {
                origin,
                destination,
                travelMode: google.maps.TravelMode.BICYCLING,
            },
            (result, status) => {
                if (status === "OK") dirRenderer.current.setDirections(result);
                // const [route] = result.routes

                console.log(result);
            }
        );
    }

    const onClick = (e: google.maps.MapMouseEvent) => {
        const newClicks = [clicks[clicks.length - 1], e.latLng];
        setClicks(newClicks);

        const [origin, destination] = newClicks;
        if (origin && destination) {
            fetchDestination(origin, destination);
        }
    };

    const onIdle = (m: google.maps.Map) => {
        setZoom(m.getZoom());
        setCenter(m.getCenter().toJSON());

        if (!dirRenderer.current.getMap()) dirRenderer.current.setMap(m);
    };

    return (
        <div>
            <Map
                style={{}}
                center={center}
                zoom={zoom}
                onClick={onClick}
                onIdle={onIdle}
                clickableIcons={false}
            >
                {clicks.map((latLng, i) => (
                    <Marker
                        key={i}
                        position={latLng}
                        animation={google.maps.Animation.DROP}
                    />
                ))}
            </Map>
        </div>
    );
}

export default App;
