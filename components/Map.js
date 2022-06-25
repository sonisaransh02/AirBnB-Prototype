import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {getCenter} from 'geolib';
import {useState} from 'react';


function Map({searchResults}) {
    
const coordinates=searchResults.map((result) => ({
        longitude:result.long,
        latitude:result.lat,
    }));
    const centercord=getCenter(coordinates);
    const[selectedLocation,setSelectedLocation]=useState({})
    const [viewport,setViewport]=useState({
        width:'100%',
        height:'100%',
        latitude:centercord.latitude,
        longitude: centercord.longitude,
        zoom: 11,
});

    return (<ReactMapGL
    mapStyle=//enter styles uri generated
    mapboxAccessToken = //enter token generated from the mapbox 
    {...viewport}
    onMove={event => setViewport(event.viewport)}
    >
    {searchResults.map((result)=>(
        <div key={result.long}>
            <Marker
        longitude={result.long}
        latitude={result.lat}
        offsetLeft={-20}
        offsetTop={-10}
        >
            <p 
            role="img"
            onClick={() => setSelectedLocation(result)}
            className="cursor-pointer text-2xl animate-bounce"
            >
            
                a</p>
            </Marker>
            {selectedLocation.long === result.long ? (
                <Popup 
                onClose={() => setSelectedLocation({})}
                closeOnClick={true}
                latitude={result.lat}
                longitude={result.long}
                    >
                    {result.title}
                </Popup>
            ) : (
                false
            )}
        </div>

    ))}
    </ReactMapGL>
    )
}

export default Map
