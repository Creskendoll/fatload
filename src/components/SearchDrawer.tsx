import React, { MutableRefObject } from "react";
import { ScreenContext } from "../App";
import _ from "lodash";
import "../styles/SearchDrawer.css";

interface Props {
    placesService: MutableRefObject<google.maps.places.PlacesService | null>;
    onSetDestination: (loc: google.maps.LatLng) => void;
    onOrder: () => void;
}

export default function SearchDrawer({
    placesService,
    onSetDestination,
    onOrder,
}: Props) {
    const [startLocationValue, setStartLocationValue] = React.useState("");
    const [, setCurrentLocation] = React.useState("");
    const [startLocationSuggestions, setStartLocationSuggestions] =
        React.useState<google.maps.places.PlaceResult[] | null>(null);
    const dbouncedStartSearch = React.useRef(_.debounce(search, 250));
    const [screenState, setScreenState] = React.useContext(ScreenContext);
    React.useEffect(() => {
        dbouncedStartSearch.current.cancel();
        dbouncedStartSearch.current(startLocationValue);
    }, [startLocationValue]);

    function search(query: string) {
        if (query) {
            placesService.current?.textSearch(
                {
                    query,
                    bounds: {
                        north: 52.676058,
                        south: 52.372748,
                        west: 13.095074,
                        east: 13.678934,
                    },
                },
                (result) => {
                    setStartLocationSuggestions(result);
                }
            );
        }
    }

    return (
        <>
            <div className="searchWrapper">
                {screenState === "search-location" && (
                    <button
                        className="current-location"
                        onClick={() =>
                            setCurrentLocation(
                                "Lohmühlenstraße 65, 12435 Berlin"
                            )
                        }
                    >
                        <span id="location-logo"></span>
                        <span id="location-text">Current location</span>
                    </button>
                )}

                <input
                    onFocus={() => {
                        setScreenState("search-location");
                    }}
                    type="text"
                    className={
                        screenState !== "search-location"
                            ? "littleSearchWrapper"
                            : "extendedSearchWrapper"
                    }
                    placeholder="Where to?"
                    value={startLocationValue}
                    onChange={(e) => {
                        setStartLocationValue(e.target.value);
                    }}
                ></input>
                <img
                    className={
                        screenState !== "search-location"
                            ? "searchIcon"
                            : "searchIconExtended"
                    }
                    src="searchIcon.png"
                    alt="icon"
                />
                <div className="searchesWrapper">
                    {startLocationSuggestions?.map((location, i) => {
                        return (
                            i < 5 &&
                            screenState === "search-location" && (
                                <div
                                    onClick={(e) => {
                                        onSetDestination(
                                            location.geometry.location
                                        );
                                        setStartLocationValue(
                                            location?.formatted_address || ""
                                        );
                                        setScreenState("in-progress");

                                        // setScreenState("map");
                                    }}
                                    key={i}
                                    className="searches"
                                >
                                    {location?.formatted_address}
                                </div>
                            )
                        );
                    })}
                </div>
            </div>
            {screenState === "search-location" && (
                <button
                    className="button btn"
                    id="mainOrderButton"
                    onClick={() => {
                        onOrder();
                        setScreenState("in-progress");
                    }}
                >
                    Order
                </button>
            )}
        </>
    );
}

// const [startLocationValue, setStartLocationValue] = React.useState("");
// const [currentLocation, setCurrentLocation] = React.useState("")
// const [startLocationSuggestions, setStartLocationSuggestions] = React.useState<google.maps.places.PlaceResult[] | null>(null);
// const dbouncedStartSearch = React.useRef(_.debounce(search, 250));
// const [, setScreen] = React.useContext(ScreenContext);

// React.useEffect(() => {
//     dbouncedStartSearch.current.cancel();
//     dbouncedStartSearch.current(startLocationValue);
// }, [startLocationValue]);

// function search(query: String) {
//     let request = {
//         query: `${query}`,
//     };

//     if (request.query) {
//         placesService.current?.textSearch(request, (result) => {
//             setStartLocationSuggestions(result);
//         });
//     }
// }

// return (
//     <>
//         <div>
//             <button
//                 className="current-location"
//                 onClick={() => setCurrentLocation("Lohmühlenstraße 65, 12435 Berlin")}
//             >
//                 <span id="location-logo"></span>
//                 <span id="location-text">current location</span>
//             </button>
//             <input
//                 onFocus={() => {
//                     setScreen("search-location");
//                 }}
//                 onBlur={() => {
//                     setScreen("map");
//                 }}
//                 type="text"
//                 className="form-control form-control-starting"
//                 placeholder="Starting From?"
//                 value={currentLocation}
//                 onChange={(e) => {
//                     setCurrentLocation(e.target.value)
//                 }}
//             ></input>
//             <input
//                 onFocus={() => {
//                     setScreen("search-location");
//                 }}
//                 onBlur={() => {
//                     setScreen("map");
//                 }}
//                 type="text"
//                 className="form-control form-control-destination"
//                 placeholder="Where to?"
//                 value={startLocationValue}
//                 onChange={(e) => {
//                     setStartLocationValue(e.target.value)
//                 }}
//             ></input>
//             <div>
//                 {startLocationSuggestions?.map((location, i) => {
//                     return (
//                         i < 5 && (
//                             <span
//                                 onClick={(e) => {
//                                     setStartLocationValue(location?.formatted_address || "")
//                                 }}
//                                 key={i}
//                             >
//                                 {location?.formatted_address}
//                             </span>
//                         )
//                     );
//                 })}
//             </div>
//         </div>
//         <button onClick={() => setScreen("in-progress")}>Order</button>
//     </>
// );
