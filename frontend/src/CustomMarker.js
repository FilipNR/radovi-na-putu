import { RADOVI, OBUSTAVE, ODRONI, ZABRANE } from './Markers';
import { Marker, Popup } from 'react-leaflet';

function CustomMarker(point) {
    if (point.type === 'RADOVI') {
        return (
            <Marker
                key={point.id}
                position={[point.lat, point.lon]}
                desc={point.desc}
                type={point.type}
                icon={RADOVI}
            >
                <Popup>{point.desc}</Popup>
            </Marker>
        );
    } if (point.type === 'OBUSTAVE') {
        return (
            <Marker
                key={point.id}
                position={[point.lat, point.lon]}
                desc={point.desc}
                type={point.type}
                icon={OBUSTAVE}
            >
                <Popup>{point.desc}</Popup>
            </Marker>
        )
    }
    if (point.type === 'ODRONI/KLIZIŠTA') {
        return (
            <Marker
                key={point.id}
                position={[point.lat, point.lon]}
                desc={point.desc}
                type={point.type}
                icon={ODRONI}
            >
                <Popup>{point.desc}</Popup>
            </Marker>
        )
    } else {
        return (
            <Marker
                key={point.id}
                position={[point.lat, point.lon]}
                desc={point.desc}
                type={point.type}
                icon={ZABRANE}
            >
                <Popup>{point.desc}</Popup>
            </Marker>
        )
    }
}

export default CustomMarker