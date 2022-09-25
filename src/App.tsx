import React from "react";
import "./styles/App.css";
import Map from "./Map";
import Marker from "./Marker";
import { mockPath } from "./constants";
import MapDrawer from "./components/MapDrawer";
import DonePage from "./components/DonePage";
import { LandingPage } from "./components/LandingPage";

type ScreenState =
    | "landing"
    | "map"
    | "search-location"
    | "in-progress"
    | "done";

export const ScreenContext = React.createContext<
    [ScreenState, (state: ScreenState) => void]
>(["landing", () => {}]);

const origin = new google.maps.LatLng(52.4940361, 13.4462696);

function App() {
    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([origin]);
    const [zoom, setZoom] = React.useState(12);
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: 52.5,
        lng: 13.4,
    });
    const [bikeLocation, setBikeLocation] =
        React.useState<google.maps.LatLng | null>(null);
    const [screen, setScreen] = React.useState<ScreenState>("landing");
    const screenValue = React.useMemo(() => [screen, setScreen], [screen]);

    const placesService = React.useRef<google.maps.places.PlacesService | null>(
        null
    );
    const dirService = React.useRef<google.maps.DirectionsService>(
        new google.maps.DirectionsService()
    );
    const dirRenderer = React.useRef<google.maps.DirectionsRenderer | null>(
        null
    );

    function animateBike(
        route: google.maps.LatLng[],
        index: number,
        wait: number
    ) {
        if (bikeLocation) return;

        setBikeLocation(route[index]);
        if (index < route.length - 1) {
            // call the next "frame" of the animation
            setTimeout(() => {
                animateBike(route, index + 1, wait);
            }, wait);
        } else {
            dirRenderer.current?.setMap(null);
            dirRenderer.current = null;
            setClicks([origin]);
            setBikeLocation(null);
            setScreen("done");
        }
    }

    function fetchDestination(
        origin: google.maps.LatLng,
        destination: google.maps.LatLng
    ) {
        if (bikeLocation) return;
        // if (mockPath) {
        //     setClicks([
        //         new google.maps.LatLng(mockPath.request.origin.location),
        //         new google.maps.LatLng(mockPath.request.destination.location),
        //     ]);
        //     dirRenderer.current.setDirections(mockPath as any);
        //     animateBike(mockPath.routes[0].overview_path as any, 0, 40);
        // } else {
        // }
        dirService.current.route(
            {
                origin,
                destination,
                travelMode: google.maps.TravelMode.BICYCLING,
            },
            (result, status) => {
                if (status === "OK") dirRenderer.current.setDirections(result);
                const [route] = result.routes;

                if (route) animateBike(route.overview_path, 0, 40);
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

        if (!dirRenderer.current?.getMap()) {
            const renderer = new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                suppressBicyclingLayer: true,
                preserveViewport: true,
            });
            renderer.setMap(m);
            dirRenderer.current = renderer;
        } else {
            dirRenderer.current.setMap(null);
            dirRenderer.current.setMap(m);
        }
        if (!placesService.current)
            placesService.current = new google.maps.places.PlacesService(m);
    };

    React.useEffect(() => {
        const renderer = dirRenderer.current;
        return () => {
            renderer?.setMap(null);
        };
    }, [dirRenderer]);

    return (
        <ScreenContext.Provider value={screenValue as any}>
            <div>
                {screen === "landing" && (
                    <>
                        <LandingPage />
                    </>
                )}
                {(screen === "map" ||
                    screen === "in-progress" ||
                    screen === "search-location") && (
                    <>
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
                                        scaledSize: new google.maps.Size(
                                            80,
                                            80
                                        ),
                                    }}
                                    position={bikeLocation}
                                />
                            )}
                        </Map>

                        <MapDrawer
                            onSetDestination={(loc) => {
                                const newLocation = [origin, loc];
                                setClicks(newLocation);
                            }}
                            onOrder={() => {
                                fetchDestination(clicks[0], clicks[1]);
                            }}
                            screen={screen}
                            placesService={placesService}
                        />
                    </>
                )}
                {screen === "done" && <DonePage />}
            </div>
        </ScreenContext.Provider>
    );
}

export default App;
