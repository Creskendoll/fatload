import "../styles/OrderStatus.css";
import DrawerContainer from "./DrawerContainer";
import OrderStatus from "./OrderStatus";
import SearchDrawer from "./SearchDrawer";

interface Props {
    screen: "map" | "in-progress";
}

export default function MapDrawer({ screen }: Props) {
    return (
        <DrawerContainer>
            {screen === "map" && <SearchDrawer />}
            {screen === "in-progress" && <OrderStatus />}
        </DrawerContainer>
    );
}
