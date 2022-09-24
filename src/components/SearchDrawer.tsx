import React, { MutableRefObject } from "react";
import { ScreenContext } from "../App";
import _ from "lodash";

interface Props {
    placesService: MutableRefObject<google.maps.places.PlacesService | null>;
}

export default function SearchDrawer({ placesService }: Props) {
    const [startLocationValue, setStartLocationValue] = React.useState("");
    const [startLocationSuggestions, setStartLocationSuggestions] =
        React.useState<google.maps.places.PlaceResult[] | null>(null);
    const dbouncedStartSearch = React.useRef(_.debounce(search, 250));
    const [, setScreen] = React.useContext(ScreenContext);

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
            <div>
                <input
                    onFocus={() => {
                        setScreen("search-location");
                    }}
                    onBlur={() => {
                        setScreen("map");
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Delivery start location"
                    value={startLocationValue}
                    onChange={(e) => {
                        
                        setStartLocationValue(e.target.value)
                    }}
                ></input>
                <div>
                {startLocationSuggestions?.map((location, i) => {
                        return (
                            i < 5 && (
                                <span
                                    onClick={(e) => {
                                        setStartLocationValue(location?.formatted_address || "")
                                    }}
                                    key={i}
                                >
                                    {location?.formatted_address}
                                </span>
                            )
                        );
                    })}
                </div>
            </div>
            <button onClick={() => setScreen("in-progress")}>Order</button>
        </>
    );
}
