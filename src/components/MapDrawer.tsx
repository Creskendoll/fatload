import { MutableRefObject } from "react";
import "../styles/OrderStatus.css";
import DrawerContainer from "./DrawerContainer";
import OrderStatus from "./OrderStatus";
import SearchDrawer from "./SearchDrawer";

interface Props {
    screen: "map" | "in-progress" | "search-location";
    placesService: MutableRefObject<google.maps.places.PlacesService | null>;
}

export default function MapDrawer({ screen, placesService }: Props) {
    return (
        <DrawerContainer>
            {(screen === "map" || screen === "search-location") && (
                <SearchDrawer placesService={placesService} />
            )}
            {screen === "in-progress" && <OrderStatus />}
        </DrawerContainer>
    );
}
