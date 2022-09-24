import { MutableRefObject } from "react";
import "../styles/OrderStatus.css";
import DrawerContainer from "./DrawerContainer";
import OrderStatus from "./OrderStatus";
import SearchDrawer from "./SearchDrawer";

interface Props {
    screen: "map" | "in-progress";
    placesService: MutableRefObject< google.maps.places.PlacesService | null>;
}

export default function MapDrawer({ screen, placesService }: Props) {
    return (
        <DrawerContainer>
            {screen === "map" && <SearchDrawer placesService={placesService} />}
            {screen === "in-progress" && <OrderStatus />}
        </DrawerContainer>
    );
}
