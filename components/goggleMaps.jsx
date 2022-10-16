import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

export default function GoogleMaps({cordenadas}) {
    const center = {
        lat: cordenadas.lat,
        lng: cordenadas.lng
    }
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY
    });

    return isLoaded ? (
        <GoogleMap
          mapContainerStyle={{width: "100%", height: "100%"}}
          center={center}
          zoom={18}
          onUnmount={map => {map = null}}
        >
          <Marker position={center} />
        </GoogleMap>
    ) : <></>
}