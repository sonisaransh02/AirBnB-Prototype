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
    mapStyle='mapbox://styles/sonisaransh/cl4tylo3o000314rm4xwkbrex'
    mapboxAccessToken ='pk.eyJ1Ijoic29uaXNhcmFuc2giLCJhIjoiY2w0dHlobjY0MDJpYTNpcWU2bHV0dDB0NSJ9.EAlTV10SKtOLf0dXDcr2-A' 
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