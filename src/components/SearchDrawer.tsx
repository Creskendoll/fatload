import React, { MutableRefObject } from "react";
import { ScreenContext } from "../App";
import _ from "lodash";

interface Props {
    placesService: MutableRefObject< google.maps.places.PlacesService | null>;
}

export default function SearchDrawer({ placesService }: Props) {
    const [startLocationValue, setStartLocationValue] = React.useState('');
    const [startLocationSuggestions, setStartLocationSuggestions] = React.useState<google.maps.places.PlaceResult[] | null>(null);
    const dbouncedStartSearch = React.useRef(_.debounce(search, 250));
    const [, setScreen] = React.useContext(ScreenContext);

    React.useEffect(() => {
        dbouncedStartSearch.current.cancel();
        dbouncedStartSearch.current(startLocationValue);
    }, [startLocationValue]);

    function search(query: String) {
        let request = {
            query: `${query}`
        };

        if (request.query) {
            placesService.current?.textSearch(request, (result) => {
                console.log(result);
                setStartLocationSuggestions(result);
            });
        }
    }

    return (
        <>
            <div>
                <input 
                    type='text' 
                    list='locations' 
                    placeholder='Delivery start location' 
                    value={startLocationValue}
                    onChange={(e) => setStartLocationValue(e.target.value)}></input>
                <datalist id='locations'>
                    {startLocationSuggestions?.map((location, i) => {
                        return i < 5 && <option key={i} value={location?.formatted_address}></option>
                    })}
                </datalist>
            </div>
            <button onClick={() => setScreen("in-progress")}>Order</button>
        </>
    );
}
