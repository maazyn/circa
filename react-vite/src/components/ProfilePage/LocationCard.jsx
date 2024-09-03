import './ProfilePage.css'

function LocationCard({location}) {

    if (!location) return (<p>Loading...</p>)
    return (
        <div key={location.id}>
            <div className="location-card" >
                <div className="location-data-container">
                <p className="location-title">{location.title}</p>
                <p className="location-detail">City: {location.city}</p>
                <p className="location-detail">Country: {location.country}</p>
                <p className="location-detail">Type: {location.type}</p>
                <p className="location-detail">Visited?: {location.visitedAt || null} </p>
                </div>
            </div>
        </div>
    )
}

export default LocationCard
