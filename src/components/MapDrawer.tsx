import { MutableRefObject } from "react";
import "../styles/OrderStatus.css";
import DrawerContainer from "./DrawerContainer";
import OrderStatus from "./OrderStatus";
import SearchDrawer from "./SearchDrawer";

interface Props {
    screen: "map" | "in-progress" | "search-location";
    placesService: MutableRefObject<google.maps.places.PlacesService | null>;
    onSetDestination: (loc: google.maps.LatLng) => void;
    onOrder: () => void;
}

export default function MapDrawer({
    screen,
    placesService,
    onSetDestination,
    onOrder,
}: Props) {
    return (
        <DrawerContainer>
            {(screen === "map" || screen === "search-location") && (
                <SearchDrawer
                    onOrder={onOrder}
                    onSetDestination={onSetDestination}
                    placesService={placesService}
                />
            )}
            {screen === "in-progress" && <OrderStatus />}
        </DrawerContainer>
    );
}
