import "../styles/Drawer.css";

export default function DrawerContainer({ children }) {
    return (
        <div className="drawer">
            <div className="divider"></div>
            {children}
        </div>
    );
}
