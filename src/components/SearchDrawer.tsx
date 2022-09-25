import React, { MutableRefObject } from "react";
import { ScreenContext } from "../App";
import _ from "lodash";
import "../styles/SearchDrawer.css"


interface Props {
    placesService: MutableRefObject<google.maps.places.PlacesService | null>;
}

export default function SearchDrawer({ placesService }: Props) {
    const [startLocationValue, setStartLocationValue] = React.useState("");
    const [startLocationSuggestions, setStartLocationSuggestions] =
        React.useState<google.maps.places.PlaceResult[] | null>(null);
    const dbouncedStartSearch = React.useRef(_.debounce(search, 250));
    const [screenState, setScreenState] = React.useContext(ScreenContext);
    console.log(screenState)
    React.useEffect(() => {
        dbouncedStartSearch.current.cancel();
        dbouncedStartSearch.current(startLocationValue);
    }, [startLocationValue]);

    function search(query: String) {
        let request = {
            query: `${query}`,
        };

        if (request.query) {
            placesService.current?.textSearch(request, (result) => {
                setStartLocationSuggestions(result);
            });
        }
    }

    return (
        <>
            <div className="searchWrapper">
                <input
                    onFocus={() => {
                        setScreenState("search-location");
                    }}
                    onBlur={() => {
                        setScreenState("map");
                    }}
                    type="text"
                    className="littleSearchWrapper"
                    placeholder="Where to?"
                    value={startLocationValue}
                    onChange={(e) => {
                        
                        setStartLocationValue(e.target.value)
                    }}
                >
                </input>
                <img className="searchIcon" src="searchIcon.png" alt="icon"/>
                <div>
                {startLocationSuggestions?.map((location, i) => {
                        return (
                            i < 5 && (
                                
                                    ( screenState === "search-location" &&
                                        <span
                                        onClick={(e) => {
                                            setStartLocationValue(location?.formatted_address || "")
                                        }}
                                        key={i}
                                    >
                                        {location?.formatted_address}
                                    </span>
                                )
                                    )
                                
                               
                        );
                    })}
                </div>
            </div>
            {/* <button onClick={() => setScreenState("in-progress")}>Order</button> */}
        </>
    );
}
