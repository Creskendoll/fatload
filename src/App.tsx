import React, { useEffect, useState } from "react";
import "./styles/App.css";
import Map from "./Map";
import Marker from "./Marker";
import { mockPath } from "./constants";

function App() {
    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = React.useState(12);
<<<<<<< Updated upstream
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: 52.5,
        lng: 13.4,
    });
    const [bikeLocation, setBikeLocation] =
        React.useState<google.maps.LatLng | null>(null);

=======
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral | null>(null);
>>>>>>> Stashed changes
    const dirService = React.useRef(new google.maps.DirectionsService());
    const dirRenderer = React.useRef(
        new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            suppressBicyclingLayer: true,
        })
    );

<<<<<<< Updated upstream
    function animateBike(
        route: google.maps.LatLng[],
        index: number,
        wait: number
    ) {
        setBikeLocation(route[index]);
        if (index < route.length - 1) {
            // call the next "frame" of the animation
            setTimeout(() => {
                animateBike(route, index + 1, wait);
            }, wait);
        }
    }
=======
    useEffect(() => {
        const USER_POSITION: google.maps.LatLngLiteral = { lat: null, lng: null }
        const DEFAULT_POSITION: google.maps.LatLngLiteral = { lat: 52.5, lng: 13.4 }
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(position => {
                CURRENT_POSITION.lat = position.coords.latitude;
                CURRENT_POSITION.lng = position.coords.longitude;
            })
        } else {
            setCenter(DEFAULT_POSITION)
        }
        setCenter(USER_POSITION)
    }, [])
>>>>>>> Stashed changes

    function fetchDestination(
        origin: google.maps.LatLng,
        destination: google.maps.LatLng
    ) {
        if (mockPath) {
            setClicks([
                new google.maps.LatLng(mockPath.request.origin.location),
                new google.maps.LatLng(mockPath.request.destination.location),
            ]);
            dirRenderer.current.setDirections(mockPath as any);
            animateBike(mockPath.routes[0].overview_path as any, 0, 40);
        } else {
            dirService.current.route(
                {
                    origin,
                    destination,
                    travelMode: google.maps.TravelMode.BICYCLING,
                },
                (result, status) => {
                    if (status === "OK")
                        dirRenderer.current.setDirections(result);
                    const [route] = result.routes;

                    if (route) animateBike(route.overview_path, 0, 40);
                }
            );
        }
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
<<<<<<< Updated upstream
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
                {bikeLocation && (
                    <Marker
                        key={"bike"}
                        icon={{
                            url: "bike.png",
                            scaledSize: new google.maps.Size(80, 80),
                        }}
                        position={bikeLocation}
                    />
                )}
            </Map>
=======
            {(center ?
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
                : <p>hi</p>
            )}
>>>>>>> Stashed changes
        </div>
    );
}

export default App;
