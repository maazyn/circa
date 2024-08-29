import { useNavigate } from "react-router-dom";
import "./MapCard.css";

function MapCard({ data }) {
    const navigate = useNavigate();

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="mapContainer">

            </div>
        </div>
    );

}

export default MapCard;
