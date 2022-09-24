import React from "react";
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
    const dirService = new google.maps.DirectionsService();

    async function fetchDestination(
        origin: google.maps.LatLng,
        destination: google.maps.LatLng
    ) {
        const destRes = await dirService.route({
            origin,
            destination,
            travelMode: google.maps.TravelMode.BICYCLING,
        });
        console.log(destRes);
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
